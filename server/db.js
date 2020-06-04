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
  circles: new Datastore({
    filename: `${process.env.DB_FILE_PATH}/circles.nedb`,
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
        } else {
          console.log(
            `inserted doc for "${doc.imdbID || doc.searchTerm || doc.email}"`
          );
          resolve(newDoc);
        }
      });
    });
  },

  upsert: (collection, query, update) => {
    return new Promise((resolve, reject) => {
      collection.update(
        query,
        update,
        { upsert: true },
        (err, numAffected, doc, isInserted) => {
          // doc is only there on insert (not update), so can't return/resovle it
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  },

  recent: (collection, query, limit) => {
    return new Promise((resolve, reject) => {
      collection
        .find(query)
        .sort({ updatedAt: -1, createdAt: -1, Title: 1 })
        .limit(limit)
        .exec((err, docs) => {
          if (err) {
            reject(err);
          } else {
            resolve(docs);
          }
        });
    });
  },

  findWithoutSort: (collection, query, limit) => {
    return new Promise((resolve, reject) => {
      collection
        .find(query)
        .limit(limit)
        .exec((err, docs) => {
          if (err) {
            reject(err);
          } else {
            resolve(docs);
          }
        });
    });
  },

  find: (collection, query, sort = { createdAt: 1 }, limit) => {
    return new Promise((resolve, reject) => {
      collection
        .find(query)
        .sort(sort)
        .limit(limit)
        .exec((err, docs) => {
          if (err) {
            reject(err);
          } else {
            resolve(docs);
          }
        });
    });
  },

  update: (collection, query, updateCmd) => {
    return new Promise((resolve, reject) => {
      collection.update(query, updateCmd, function (err, numRemoved) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },

  remove: (collection, query) => {
    return new Promise((resolve, reject) => {
      collection.remove(query, {}, function (err, numRemoved) {
        if (err) {
          reject(err);
        } else {
          console.log({ numRemoved });
          resolve(true);
        }
      });
    });
  },

  count: (collection, query) => {
    return new Promise((resolve, reject) => {
      collection.count(query, (err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    });
  },
};

const createIndex = async (collection, field, isUnique) => {
  return new Promise((resolve, reject) => {
    collection.ensureIndex({ fieldName: field, unique: isUnique }, function (
      err
    ) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

(async () => {
  console.log("Creating indexes");
  try {
    await createIndex(db.movies, "imdbID", true);
    await createIndex(db.searches, "searchTerm", true);
    await createIndex(db.users, "googleId", true);
    await createIndex(db.users, "googleToken", true);
    await createIndex(db.likes, "googleId", false);
    await createIndex(db.likes, "imdbID", false);
    await createIndex(db.circles, "googleId", false);
  } catch (err) {
    console.error("Problem generating indexes", err);
  }
})();

module.exports = db;
