const fs = require("fs");
require("dotenv").config();

const getConfig = () => {
  let config = {
    logger: {
      level: "debug",
    },
  };

  if (process.env.NODE_ENV !== "development") {
    config = {
      https: {
        allowHTTP1: true,
        key: fs.readFileSync(
          "/etc/letsencrypt/live/movierex.olore.net/privkey.pem"
        ),
        cert: fs.readFileSync(
          "/etc/letsencrypt/live/movierex.olore.net/cert.pem"
        ),
      },
      ...config,
    };
  }
  return config;
};

const fastify = require("fastify")(getConfig());
const userDecorator = require("./user-decorator");

fastify.register(require("fastify-cors"), {
  origin: ["http://localhost:8080", "https://movierex.olore.net"],
});

fastify.decorateRequest("user", null);
fastify.addHook("onRequest", async (request, reply) => {
  if (request.raw.method === "OPTIONS") return;
  request.user = await userDecorator(fastify, request, reply);
});

fastify.register(require("./routes/movies"));
fastify.register(require("./routes/circles"));
fastify.register(require("./routes/users"));

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
