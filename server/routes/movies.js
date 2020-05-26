const api = require("../omdb-api");
const db = require("../db");

async function routes(fastify, options) {
  // show
  fastify.get("/movie/:id", async (request, reply) => {
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

  // search
  fastify.get("/movie", async (request, reply) => {
    const query = request.query.s;
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
}
module.exports = routes;
