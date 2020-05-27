const api = require("../omdb-api");
const db = require("../db");

async function routes(fastify, options) {
  fastify.get("/movie/show/:id", async (request, reply) => {
    const id = request.params.id;
    const fromDb = await db.findOne(db.movies, { imdbID: id });
    if (!fromDb) {
      const json = await api.getById(id);
      fastify.log.debug("Found in API", id);
      await db.insert(db.movies, json);
      return json;
    } else {
      fastify.log.debug("Found in DB", id);
      return fromDb;
    }
  });

  fastify.get("/movie/search/:query", async (request, reply) => {
    const query = request.params.query;
    fastify.log.info(`${request.user.name} - search for ${query}`);

    const fromDb = await db.findOne(db.searches, { searchTerm: query });
    if (!fromDb) {
      const json = await api.search(query);
      json.searchTerm = query;
      fastify.log.debug("Found in API", json.searchTerm);
      await db.insert(db.searches, json);
      return json;
    } else {
      fastify.log.debug("Found in DB", fromDb.searchTerm);
      return fromDb;
    }
  });

  fastify.get("/movie/recent", async (request, reply) => {
    let limit = request.query.limit || 12;
    return new Promise((resolve, reject) => {
      db.movies
        .find({ Plot: { $ne: "N/A" } })
        .sort({ updatedAt: -1, createdAt: -1, Title: 1 })
        .limit(limit)
        .exec((err, docs) => {
          if (err) reject(err);
          resolve(docs);
        });
    });
  });
}
module.exports = routes;
