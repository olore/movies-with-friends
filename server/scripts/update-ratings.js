process.env["DB_FILE_PATH"] = "/Users/brian/dev";
process.env["API_KEY"] = "4ec99377";

const db = require("../db");
const api = require("../omdb-api");

let movies = [];

updateAll = async () => {
  movies = await db.find(db.movies, {});
  movies.forEach(async (m) => {
    console.log(m.imdbRating, m.Title);
    const json = await api.getById(m.imdbID);
    await db.remove(db.movies, { imdbID: m.imdbID });
    await db.insert(db.movies, json);

    // one time - make arrays
    await db.update(
      db.movies,
      { imdbID: m.imdbID },
      {
        $set: {
          Actors: m.Actors.split(", "),
          Director: m.Director.split(", "),
          Country: m.Country.split(", "),
          Genre: m.Genre.split(", "),
          Writer: m.Writer.split(", "),
        },
      }
    );
    let movie = await db.findOne(db.movies, { imdbID: m.imdbID });
    console.log(movie.imdbRating, movie.Title);
  });
};

updateAll();
