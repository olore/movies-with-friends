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
        return user;
      }
    } else {
      fastify.log.error("No user token");
    }
  } catch (err) {
    fastify.log.error("123 Error", err);
  }
}

module.exports = userDecorator;
