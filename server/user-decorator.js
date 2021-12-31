const db = require("./db");
const google = require("./google");
require("dotenv").config();

async function userDecorator(fastify, request, reply) {
  if (process.env.NO_GOOGLE === "true") {
    return await db.findOne(db.users, { name: "Cinco Olore" });
  }
  try {
    // check if authenticated
    const token = request.headers["googletoken"];
    if (token === "undefined") {
      return undefined; // allow anonymous
    }
    // look up in DB by token
    let user = await db.findOne(db.users, { googleToken: token });

    if (user && user.exp * 1000 > Date.now()) {
      fastify.log.info("Got user from db");
    } else {
      fastify.log.info("Verifying user token with Google");
      let googleUser = await google.verify(token).catch((err) => {
        fastify.log.error("ERROR", err);
      });
      const googleId = googleUser.sub;
      user = {
        googleId,
        googleToken: token,
        exp: googleUser.exp,
        name: googleUser.name,
        given_name: googleUser.given_name,
        family_name: googleUser.family_name,
        picture: googleUser.picture,
      };
      let isSuccess = await db.upsert(db.users, { googleId }, user);
      if (!isSuccess) throw new Exception("Failed to upsert", user);
    }
    fastify.log.error({ user });
    return user;
  } catch (err) {
    fastify.log.error("123 Error", err.message);
    throw err;
  }
}

module.exports = userDecorator;
