import Datastore from "nedb";
require("dotenv").config();

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

  findOne: (collection, query) => {
    return new Promise((resolve, reject) => {
      collection.findOne(query, function (err, doc) {
        resolve(doc);
      });
    });
  },
  insert: (collection, doc) => {
    return new Promise((resolve, reject) => {
      collection.insert(doc, function (err, newDoc) {
        if (err) {
          console.error("Failed to insert into db", err);
          reject(err);
        }
        console.log(`inserted doc for "${doc.imdbID || doc.searchTerm}"`);
        resolve(newDoc);
      });
    });
  },
};

db.movies.ensureIndex({ fieldName: "imdbID" }, function (err) {
  if (err) console.error(err);
});
db.searches.ensureIndex({ fieldName: "searchTerm" }, function (err) {
  if (err) console.error(err);
});

module.exports = db;
