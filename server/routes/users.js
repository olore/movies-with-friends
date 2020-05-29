const db = require("../db");

async function routes(fastify, options) {
  fastify.get("/users/self", async (request, reply) => {
    let user = request.user;
    return user;
  });
}
module.exports = routes;
