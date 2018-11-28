const { MongoClient } = require('mongodb');
const fs = MongoClient;

const database = 'mongodb://kailun94:kailun94@ds117834.mlab.com:17834/kailun94';

const appname = 'kailun94'; //cloud
// const appname='placesapp';//local
const collectionname = 'kailunMedicalSupport';
const saveData = newdata => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB');
        }

        console.log('Connected to MongoDB');
        const db = client.db(appname);

        const length = newdata.length;
        for (var i = 0; i < length; i++) {
          db.collection(collectionname).insertOne(newdata[i], (err, result) => {
            if (err) {
              reject('unable to insert');
            }
          });
        }
        resolve(1);

        client.close();
      }
    );
  });
};

const getAllData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB');
        }

        console.log('Connected to MongoDB');
        const db = client.db(appname);

        db.collection(collectionname)
          .find()
          .toArray()
          .then(
            docs => {
              resolve(docs);
            },
            err => {
              reject('Unable to fetch docs');
            }
          );

        client.close();
      }
    );
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB');
        }

        console.log('Connected to MongoDB');
        const db = client.db(appname);

        db.collection(collectionname)
          .remove({})
          .then(
            result => {
              resolve(result);
            },
            err => {
              reject('Unable to delete');
            }
          );

        client.close();
      }
    );
  });
};

module.exports = {
  saveData,
  getAllData,
  deleteAll
};
