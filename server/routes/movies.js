const api = require("../omdb-api");
const db = require("../db");

async function routes(fastify, options) {
  fastify.get("/movie/show/:id", async (request, reply) => {
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
    return movie;
  });

  fastify.get("/movie/search/:query", async (request, reply) => {
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

  fastify.get("/movie/recent", async (request, reply) => {
    const limit = request.query.limit || 12;
    const query = { Plot: { $ne: "N/A" } };
    return await db.recent(db.movies, query, limit);
  });

  fastify.post("/movie/like/:id", async (request, reply) => {
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
