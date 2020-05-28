const db = require("./db");
const google = require("./google");

async function userDecorator(fastify, request, reply) {
  try {
    // check if authenticated
    const token = request.headers["googletoken"];
    if (token && token !== "") {
      // look up in DB by token
      let user = await db.findOne(db.users, { googleToken: token });

      if (user && user.exp * 1000 > Date.now()) {
        fastify.log.info("Got user from db");
        return user;
      } else {
        fastify.log.info("Verifying user token with Google");
        let googleUser = await google.verify(token).catch((err) => {
          fastify.log.error("ERROR", err);
        });
        const googleId = googleUser.sub;
        // look up in DB by id and either update or insert
        user = await db.upsert(
          db.users,
          { googleId },
          {
            googleId,
            googleToken: token,
            exp: googleUser.exp,
            name: googleUser.name,
            given_name: googleUser.given_name,
            family_name: googleUser.family_name,
            picture: googleUser.picture,
          }
        );
      }
      return user;
    }
  } catch (err) {
    fastify.log.error("123 Error", err);
  }
}

module.exports = userDecorator;
