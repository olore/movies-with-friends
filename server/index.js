const fastify = require("fastify")({
  logger: {
    level: "debug",
  },
});
const db = require("./db");
const api = require("./omdb-api");
const google = require("./google");

fastify.decorateRequest("user", null);

// check for google auth
fastify.addHook("onRequest", async (request, reply) => {
  if (request.raw.method === "OPTIONS") return;

  try {
    // check if authenticated
    const token = request.headers["googletoken"];
    if (token && token !== "") {
      // look up in DB by token
      let user = await db.findOne(db.users, { googleToken: token });

      if (user && user.exp * 1000 > Date.now()) {
        fastify.log.info("Got user from db");
        request.user = user;
      } else {
        fastify.log.info("Verifying user token with Google");
        let googleUser = await google.verify(token).catch((err) => {
          fastify.log.error("ERROR", err);
        });
        googleUser.googleToken = token;
        googleUser.googleId = googleUser.sub;
        // look up in DB by id
        user = await db.findOne(db.users, { googleId: googleUser.googleId });
        if (user) {
          await db.users.update(
            { googleId: googleUser.googleId },
            {
              $set: {
                exp: googleUser.exp,
                googleToken: googleUser.googleToken,
              },
            },
            (err, numReplaced) => {
              fastify.log.info(
                "Updated expiry and token for user in db",
                numReplaced
              );
              if (err) {
                fastify.log.error("Failed updating user in db", err);
              }
            }
          );
        } else {
          fastify.log.info("Adding user to db");
          user = await db.insert(db.users, googleUser);
        }
        request.user = user;
      }
    } else {
      fastify.log.error("No user token");
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
