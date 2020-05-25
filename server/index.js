const fetch = require("node-fetch");
const fastify = require("fastify")({
  logger: true,
});

require("dotenv").config();
const API_KEY = process.env.API_KEY;

const db = require("./db");
fastify.register(require("fastify-cors"), {
  // put your options here
  // TODO only allow it to process requests from same host?
});

fastify.get("/movie/:id", async (request, reply) => {
  const id = request.params.id;
  return new Promise((resolve, reject) => {
    // get it from the db
    db.movies.findOne({ imdbID: id }, function (err, doc) {
      if (!doc) {
        // get it from API
        fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${request.params.id}`
        )
          .then((results) => results.json())
          .then((data) => {
            db.movies.insert(data, function (err, newDoc) {
              if (err) {
                console.error("Failed to insert into db", err);
                reject(err);
              }
              console.log("found in API", id, data);
              console.log(`inserted ${newDoc._id} for movie id ${id}`);
              resolve(newDoc);
            });
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      } else {
        console.log("found in DB", id);
        resolve(doc);
      }
    });
  });
});

fastify.get("/movie", async (request, reply) => {
  // TODO check cache ?
  const query = request.query.s;
  fastify.log.info(`search for ${query}`);

  return new Promise((resolve, reject) => {
    db.searches.findOne({ searchTerm: query }, function (err, doc) {
      if (!doc) {
        // get it from API
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
          .then((results) => results.json())
          .then((json) => {
            json.searchTerm = query;
            db.searches.insert(json, function (err, newDoc) {
              if (err) {
                console.error("Failed to insert into db", err);
                reject(err);
              }
              console.log(`inserted ${newDoc._id} for search term ${query}`);
              resolve(newDoc);
            });
          });
      } else {
        // this.addLikes(movie);
        console.log("Found in DB");
        resolve(doc);
      }
    });
  });
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
