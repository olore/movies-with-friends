const api = require("../omdb-api");
const db = require("../db");

async function routes(fastify, options) {
  fastify.get("/movies/show/:id", async (request, reply) => {
    const user = request.user;
    const id = request.params.id;

    let movie = await db.findOne(db.movies, { imdbID: id });
    if (!movie) {
      const json = await api.getById(id);
      fastify.log.debug("Found in API", id);
      movie = await db.insert(db.movies, json);
    } else {
      fastify.log.debug("Found in DB", id);
    }

    await db.updateViewedAt(db.movies, { _id: movie._id });

    movie.likes = await db.find(
      db.likes,
      { imdbID: id },
      db.SORT_NONE,
      db.LIMIT_NONE
    );
    if (movie.likes && movie.likes.length > 0) {
      movie.likerCircles = await getLikerCircles(user, movie.likes);
      movie.likers = await getLikers(user, movie.likes);
    }

    return movie;
  });

  fastify.get("/movies/search/:query", async (request, reply) => {
    const query = request.params.query;
    fastify.log.info(`${request.user.name} - search for ${query}`);

    const fromDb = await db.findOne(db.searches, { searchTerm: query });
    if (fromDb) {
      fastify.log.debug("Found in DB", fromDb.searchTerm);
      return fromDb;
    } else {
      const json = await api.search(query);
      if (json.Response !== "False") {
        json.searchTerm = query;
        fastify.log.debug("Found in API", json.searchTerm);
        await db.insert(db.searches, json);
      }
      return json;
    }
  });

  fastify.get("/movies/recentlySearched", async (request, reply) => {
    let { offset, limit } = getBasicParams(request.query);
    let movies = await db.findWithOffset(
      db.movies,
      db.QUERY_ALL,
      { viewedAt: -1, updatedAt: -1 },
      offset,
      limit
    );
    return {
      count: movies.length,
      movies,
    };
  });

  fastify.get("/movies/myRated", async (request, reply) => {
    let { sortBy, offset, limit } = getBasicParams(request.query);
    let myLikes = await db.find(
      db.likes,
      {
        googleId: request.user.googleId,
      },
      sortBy,
      db.LIMIT_NONE
    );

    let query = {
      imdbID: { $in: myLikes.map((m) => m.imdbID) },
    };

    let movies = await db.findWithOffset(
      db.movies,
      query,
      db.SORT_NONE,
      offset,
      limit
    );

    movies = await addLikes(request.user, movies);

    return {
      count: movies.length,
      movies,
    };
  });

  fastify.get("/movies/forCircle", async (request, reply) => {
    let { sortBy, offset, limit } = getBasicParams(request.query);
    const circleId = request.query.circleId;

    let circle = await db.findOne(db.circles, { _id: circleId });
    let circleMembers = [circle.owner, ...circle.members];

    let circleLikes = await db.find(
      db.likes,
      { googleId: { $in: circleMembers.map((m) => m.googleId) } },
      sortBy,
      db.LIMIT_NONE
    );

    let uniqueLikedMovieIds = Array.from(
      new Set(circleLikes.map((movie) => movie.imdbID)) // unique
    );
    let query = {
      imdbID: { $in: uniqueLikedMovieIds },
    };

    let movies = await db.findWithOffset(
      db.movies,
      query,
      db.SORT_NONE,
      offset,
      limit
    );

    movies = await addLikes(request.user, movies);

    return {
      count: movies.length,
      totalCount: uniqueLikedMovieIds.length,
      movies,
    };
  });
  fastify.get("/movies/recentlyRated", async (request, reply) => {
    let { sortBy, offset, limit } = getBasicParams(request.query);

    let likedMovies = await db.find(
      db.likes,
      db.QUERY_ALL,
      sortBy,
      db.LIMIT_NONE
    );
    let uniqueLikedMovieIds = Array.from(
      new Set(likedMovies.map((movie) => movie.imdbID)) // unique
    );
    let query = {
      imdbID: { $in: uniqueLikedMovieIds },
    };

    let movies = await db.findWithOffset(
      db.movies,
      query,
      db.SORT_NONE,
      offset,
      limit
    );

    movies = await addLikes(request.user, movies);

    return {
      count: movies.length,
      totalCount: uniqueLikedMovieIds.length,
      movies,
    };
  });

  fastify.post("/movies/:id/like", async (request, reply) => {
    const body = JSON.parse(request.body); // TODO limit size of what is going in SPAM
    const imdbID = request.params.id;
    const user = request.user;
    if (!user) {
      reply
        .code(401)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "User not authenticated" });
    }
    let success = await db.upsert(
      db.likes,
      { imdbID, googleId: user.googleId },
      {
        imdbID,
        rating: body.rating,
        comment: body.comment,
        googleId: user.googleId,
        name: user.name,
      }
    );
    return success;
  });
}

async function getLikerCircles(user, likes) {
  let toReturn = [];

  // all the likers of this movie, not including user
  let likerGoogleIds = new Set(
    likes
      .filter((like) => {
        return like.googleId !== user.googleId;
      })
      .map((like) => {
        return like.googleId;
      })
  );

  likerGoogleIds = Array.from(likerGoogleIds);
  if (likerGoogleIds.length > 0) {
    for (let j = 0; j < likerGoogleIds.length; j++) {
      let gid = likerGoogleIds[j];
      let likerCircles = await db.find(db.circles, {
        $and: [
          {
            $or: [
              {
                members: { $elemMatch: { googleId: user.googleId } },
              },
              { "owner.googleId": user.googleId },
            ],
          },
          {
            $or: [
              {
                members: { $elemMatch: { googleId: gid } },
              },
              { "owner.googleId": gid },
            ],
          },
        ],
      });
      if (likerCircles && likerCircles.length > 0) {
        toReturn.push(...likerCircles);
      }
    }
  }
  return toReturn;
}

const addLikes = async (user, movies) => {
  for (let i = 0; i < movies.length; i++) {
    movie = movies[i];
    movie.likes = await db.find(
      db.likes,
      { imdbID: movie.imdbID },
      db.SORT_NONE,
      db.LIMIT_NONE
    );
    if (movie.likes && movie.likes.length > 0) {
      movie.likerCircles = await getLikerCircles(user, movie.likes);
      movie.likers = await getLikers(user, movie.likes);
    }
  }
  return movies;
};

const getBasicParams = (query) => {
  let opts = {
    limit: Math.min(25, Number.parseInt(query.limit) || 12),
    offset: Number.parseInt(query.offset, 10) || 0,
    sortBy: { updatedAt: -1 },
  };
  if (query.sort && query.sort !== "date") {
    opts.sortBy = { rating: -1 };
  }
  return opts;
};

async function getLikers(user, likes) {
  let likers = {};

  // all the likers of this movie, not including user
  let likerGoogleIds = new Set(
    likes
      .filter((like) => {
        return like.googleId !== user.googleId;
      })
      .map((like) => {
        return like.googleId;
      })
  );

  likerGoogleIds = Array.from(likerGoogleIds);
  if (likerGoogleIds.length > 0) {
    for (let j = 0; j < likerGoogleIds.length; j++) {
      let gid = likerGoogleIds[j];
      let likerCircles = await db.find(db.circles, {
        $and: [
          {
            $or: [
              {
                members: { $elemMatch: { googleId: user.googleId } },
              },
              { "owner.googleId": user.googleId },
            ],
          },
          {
            $or: [
              {
                members: { $elemMatch: { googleId: gid } },
              },
              { "owner.googleId": gid },
            ],
          },
        ],
      });

      if (likerCircles && likerCircles.length) {
        for (let i = 0; i < likerCircles.length; i++) {
          let circle = likerCircles[i];
          if (likers[gid] === undefined) likers[gid] = [];
          likers[gid].push(circle);
        }
      }
    }
  }
  return likers;
}
module.exports = routes;
