process.env["DB_FILE_PATH"] = "/Users/brian/dev";
process.env["API_KEY"] = "4ec99377";

const db = require("../db");
const api = require("../omdb-api");

let movies = [];

updateUnRated = async () => {
  movies = await db.find(db.movies, { imdbRating: "N/A" });
  movies.forEach(async (m) => {
    console.log(m.imdbRating, m.Title);
    const json = await api.getById(m.imdbID);
    await db.remove(db.movies, { imdbID: m.imdbID });
    await db.insert(db.movies, json);

    let movie = await db.findOne(db.movies, { imdbID: m.imdbID });
    console.log(movie.imdbRating, movie.Title);
  });
};

updateAll = async () => {
  movies = await db.find(db.movies, {});
  movies.forEach(async (m) => {
    console.log(m.imdbRating, m.Title);
    const json = await api.getById(m.imdbID);
    await db.remove(db.movies, { imdbID: m.imdbID });
    await db.insert(db.movies, json);

    let movie = await db.findOne(db.movies, { imdbID: m.imdbID });
    console.log(movie.imdbRating, movie.Title);
  });
};

// updateUnRated();
updateAll();
