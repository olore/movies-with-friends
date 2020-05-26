const fastify = require("fastify")({
  logger: {
    level: "debug",
  },
});
const db = require("./db");
const api = require("./omdb-api");
const google = require("./google");

// check for google auth
fastify.addHook("onRequest", async (request, reply) => {
  try {
    console.log("headers", request.headers);
    const token = request.headers["token"];
    if (token && token !== "") {
      fastify.log.info("sending token to google", token);
      // await google.verify(token).catch((err) => {
      //   fastify.log.error("ERROR", err);
      // });
      await google.verify(token).catch(console.error);
    }
  } catch (err) {
    fastify.log.error("123 Error", err);
  }
});

fastify.register(require("fastify-cors"), {
  // put your options here
  // TODO only allow it to process requests from same host?
});

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
  fastify.log.info(`search for ${query}`);

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

// search
fastify.get("/oauth-callback", async (request, reply) => {
  console.log("query", request.query);
  console.log(params, request.params);
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
