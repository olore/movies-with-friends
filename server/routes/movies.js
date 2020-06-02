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

    //get likes
    movie.likes = await db.recent(db.likes, { imdbID: id }, 100);
    movie.likers = {};

    // all the likers of this movie, not including user
    let likerGoogleIds = new Set(
      movie.likes
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
            if (movie.likers[gid] === undefined) movie.likers[gid] = [];
            movie.likers[gid].push(circle);
          }
        }
      }
    }
    return movie;
  });

  fastify.get("/movies/search/:query", async (request, reply) => {
    const query = request.params.query;
    fastify.log.info(`${request.user.name} - search for ${query}`);

    const fromDb = await db.findOne(db.searches, { searchTerm: query });
    if (!fromDb) {
      const json = await api.search(query);
      json.searchTerm = query;
      fastify.log.debug("Found in API", json.searchTerm);
      if (json.Response !== "False") {
        await db.insert(db.searches, json);
      }
      return json;
    } else {
      fastify.log.debug("Found in DB", fromDb.searchTerm);
      return fromDb;
    }
  });

  fastify.get("/movies/recentlySearched", async (request, reply) => {
    const limit = request.query.limit || 12;
    return await db.recent(db.movies, {}, limit);
  });

  fastify.get("/movies/recentlyRated", async (request, reply) => {
    const limit = request.query.limit || 12;
    let likedMovies = await db.recent(db.likes, {}, 20); // get 20 in case some are the same
    let query = {
      imdbID: { $in: likedMovies.map((m) => m.imdbID) },
    };
    let docs = await db.findWithoutSort(db.movies, query, limit);
    return docs;
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
module.exports = routes;
