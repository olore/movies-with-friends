const db = require("../db");

async function routes(fastify, options) {
  fastify.get("/circles", async (request, reply) => {
    const user = request.user;
    return await db.find(db.circles, { owner: user.googleId }, 25);
    // TODO: also find ones I am a member of, not just owner
    // db.find({ completeData: { planets: { $elemMatch: { name: 'Earth', number: 3 } } } }, function (err, docs) {
    //   // docs contains documents with id 5 (completeData)
    // });
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
      { owner: user.googleId, name: body.name },
      {
        owner: user.googleId,
        name: body.name,
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
      { owner: user.googleId, _id: id },
      {
        owner: user.googleId,
        name: body.name,
        members: body.members,
      }
    );
    return success;
  });

  fastify.post("/circles/:id/join", async (request, reply) => {
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
      { _id: id },
      {
        $push: { members: { name: user.name, googleId: user.googleId } },
      }
    );
    return success;
  });
}
module.exports = routes;
