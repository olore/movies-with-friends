const fetch = require("node-fetch");
const fastify = require("fastify")({
  logger: true,
});

require("dotenv").config();
const API_KEY = process.env.API_KEY;

const db = require("./db");
fastify.register(require("fastify-cors"), {
  // put your options here
  // TODO only allow it to process requests from same host?
});

// show
fastify.get("/movie/:id", async (request, reply) => {
  const id = request.params.id;

  const fromDb = await db.findOne(db.movies, { imdbID: id });
  if (!fromDb) {
    const fromApi = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${request.params.id}`
    );
    const json = await fromApi.json();
    console.log("Found in API", id);

    await db.insert(db.movies, json);
    return json;
  } else {
    console.log("Found in DB", id);
    return fromDb;
  }
});

// search
fastify.get("/movie", async (request, reply) => {
  const query = request.query.s;
  fastify.log.info(`search for ${query}`);

  const fromDb = await db.findOne(db.searches, { searchTerm: query });
  if (!fromDb) {
    const fromApi = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    const json = await fromApi.json();
    json.searchTerm = query;
    fastify.log.debug("Found in API", json.searchTerm);
    await db.insert(db.searches, json);
    return json;
  } else {
    fastify.log.debug("Found in DB", fromDb.searchTerm);
    return fromDb;
  }
});

const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
