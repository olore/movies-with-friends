const fetch = require("node-fetch");
const fastify = require("fastify")({
  logger: true,
});

require("dotenv").config();
const API_KEY = process.env.API_KEY;

fastify.register(require("fastify-cors"), {
  // put your options here
  // TODO only allow it to process requests from same host?
});

fastify.get("/movie/:id", async (request, reply) => {
  return fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${request.params.id}`
  ).then((results) => results.json());
});

fastify.get("/movie", async (request, reply) => {
  // TODO check cache ?
  const query = request.query.s;
  fastify.log.info(`search for ${query}`);
  return fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
  ).then((results) => results.json());
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
