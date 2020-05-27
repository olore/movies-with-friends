const Datastore = require("nedb");
require("dotenv").config();

const db = {
  movies: new Datastore({
    filename: `${process.env.DB_FILE_PATH}/movies.nedb`,
    autoload: true,
    timestampData: true,
  }),
  searches: new Datastore({
    filename: `${process.env.DB_FILE_PATH}/searches.nedb`,
    autoload: true,
    timestampData: true,
  }),
  users: new Datastore({
    filename: `${process.env.DB_FILE_PATH}/users.nedb`,
    autoload: true,
    timestampData: true,
  }),
  likes: new Datastore({
    filename: `${process.env.DB_FILE_PATH}/likes.nedb`,
    autoload: true,
    timestampData: true,
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
        console.log(
          `inserted doc for "${doc.imdbID || doc.searchTerm || doc.email}"`
        );
        resolve(newDoc);
      });
    });
  },
};

const createIndex = async (collection, field, isUnique) => {
  return new Promise((resolve, reject) => {
    collection.ensureIndex({ fieldName: field, unique: isUnique }, function (
      err
    ) {
      if (err) reject(err);
      resolve();
    });
  });
};

async () => {
  try {
    await createIndex(db.movies, "imdbID", true);
    await createIndex(db.searches, "searchTerm", true);
    await createIndex(db.users, "googleId", true);
    await createIndex(db.users, "googleToken", true);
    await createIndex(db.likes, "googleId", true);
    await createIndex(db.likes, "imdbID", true);
  } catch (err) {
    console.error("Problem generating indexes", err);
  }
};

module.exports = db;
