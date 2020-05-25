import Datastore from "nedb";

const db = {
  movies: new Datastore({
    filename: `${process.env.DB_FILE_PATH}/movies.nedb`,
    autoload: true,
  }),
  searches: new Datastore({
    filename: `${process.env.DB_FILE_PATH}/searches.nedb`,
    autoload: true,
  }),
  users: new Datastore({
    filename: `${process.env.DB_FILE_PATH}/users.nedb`,
    autoload: true,
  }),
};

module.exports = db;
