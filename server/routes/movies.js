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

    movie.likes = await db.recent(db.likes, { imdbID: id }, 100);
    movie.likers = await getLikers(user, movie.likes);

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
    const limit = request.query.limit || 12;
    return await db.recent(db.movies, {}, limit);
  });

  fastify.get("/movies/myRated", async (request, reply) => {
    const sortBy = request.query.sort || "date"; // date || rating
    let sort = { updatedAt: -1 };
    if (sortBy === "rating") {
      sort = {
        rating: -1,
      };
    }
    console.log({ sort });
    let likedMovies = await db.find(
      db.likes,
      {
        googleId: request.user.googleId,
      },
      sort,
      100
    );
    console.log(likedMovies);
    let query = {
      imdbID: { $in: likedMovies.map((m) => m.imdbID) },
    };
    let movies = await db.findWithoutSort(db.movies, query, 100);

    for (let i = 0; i < movies.length; i++) {
      movie = movies[i];
      movie.likes = await db.recent(db.likes, { imdbID: movie.imdbID }, 100);
      movie.likerCircles = await getLikerCircles(request.user, movie.likes);
    }

    return movies;
  });

  fastify.get("/movies/recentlyRated", async (request, reply) => {
    const limit = request.query.limit || 12;
    const offset = request.query.offset || 0;

    let likedMovies = await db.recent(db.likes, {}, -1);
    let uniqueLikedMovieIds = Array.from(
      new Set(likedMovies.map((movie) => movie.imdbID))
    );
    let query = {
      imdbID: { $in: uniqueLikedMovieIds },
    };

    let cursor = db.movies.find(query).skip(offset).limit(limit); // move to db.js
    let movies = await new Promise((resolve, reject) => {
      cursor.exec(function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });

    for (let i = 0; i < movies.length; i++) {
      movie = movies[i];
      movie.likes = await db.recent(db.likes, { imdbID: movie.imdbID }, 100);
      movie.likerCircles = await getLikerCircles(request.user, movie.likes);
    }

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
        toReturn.push(...likerCircles.map((circle) => circle.name));
      }
    }
  }
  return toReturn;
}

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
