const db = require("../db");

async function routes(fastify, options) {
  fastify.get("/circles", async (request, reply) => {
    const user = request.user;
    return await db.find(
      db.circles,
      {
        $or: [
          { owner: { googleId: user.googleId } },
          { members: { $elemMatch: { googleId: user.googleId } } },
        ],
      },
      25
    );
  });

  fastify.delete("/circles/:id/me", async (request, reply) => {
    const user = request.user;
    const id = request.params.id;
    if (!user) {
      reply
        .code(401)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "User not authenticated" });
    }
    return await db.remove(db.circles, {
      members: { googleId: user.googleId },
    });
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
    return await db.remove(db.circles, {
      owner: { googleId: user.googleId },
      _id: id,
    });
  });

  fastify.get("/circles/show/:id", async (request, reply) => {
    const user = request.user;
    const id = request.params.id;
    if (!user) {
      reply
        .code(401)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "User not authenticated" });
    }
    return await db.findOne(db.circles, { _id: id });
  });

  fastify.post("/circles", async (request, reply) => {
    const body = JSON.parse(request.body); // TODO limit size of what is going in SPAM
    const user = request.user;
    if (!user) {
      reply
        .code(401)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "User not authenticated" });
    }
    let success = await db.upsert(
      db.circles,
      { owner: { googleId: user.googleId }, name: body.name },
      {
        owner: { name: user.name, googleId: user.googleId },
        name: body.name,
        members: [{ name: user.name, googleId: user.googleId }],
      }
    );
    return success;
  });

  fastify.post("/circles/:id", async (request, reply) => {
    const body = JSON.parse(request.body); // TODO limit size of what is going in SPAM
    const user = request.user;
    const id = request.params.id;
    if (!user) {
      reply
        .code(401)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "User not authenticated" });
    }
    let success = await db.upsert(
      db.circles,
      { owner: { name: user.name, googleId: user.googleId }, _id: id },
      {
        owner: { name: user.name, googleId: user.googleId },
        name: body.name,
        members: body.members,
      }
    );
    return success;
  });

  fastify.post("/circles/:id/join", async (request, reply) => {
    const user = request.user;
    const circleId = request.params.id;
    if (!user) {
      reply
        .code(401)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "User not authenticated" });
    }
    let success = await db.upsert(
      db.circles,
      { _id: circleId },
      {
        $push: { members: { name: user.name, googleId: user.googleId } },
      }
    );
    return success;
  });
}
module.exports = routes;
