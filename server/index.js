const fetch = require("node-fetch");
const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("fastify-cors"), {
  // put your options here
});

fastify.get("/movie/:id", async (request, reply) => {
  return fetch(
    `https://www.omdbapi.com/?apikey=4ec99377&i=${request.params.id}`
  ).then((results) => results.json());
});

fastify.get("/movie", async (request, reply) => {
  // TODO check cache ?
  const query = request.query.s;
  fastify.log.info(`search for ${query}`);
  return fetch(
    `https://www.omdbapi.com/?apikey=4ec99377&s=${query}`
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
