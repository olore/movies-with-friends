const db = require("../db");

async function routes(fastify, options) {
  fastify.get("/circles", async (request, reply) => {
    const user = request.user;
    return await db.recent(db.circles, { owner: user.googleId }, 25);
    // return [
    //   { name: "My Tribe", members: 6 },
    //   { name: "Family", members: 3 },
    // ];
  });

  fastify.delete("/circles/:id", async (request, reply) => {
    const user = request.user;
    const id = request.params.id;
    if (!user) {
      reply
        .code(401)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "User not authenticated" });
    }
    return await db.remove(db.circles, { owner: user.googleId, _id: id });
  });

  fastify.post("/circles", async (request, reply) => {
    const body = JSON.parse(request.body); // TODO limit size of what is going in SPAM
    const user = request.user;
    const id = body.id;
    if (!user) {
      reply
        .code(401)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "User not authenticated" });
    }
    let success = await db.update(
      db.circles,
      { owner: user.googleId, _id: id },
      {
        owner: user.googleId,
        name: body.name,
        invitees: body.invitees,
      }
    );
    return success;
  });
}
module.exports = routes;
