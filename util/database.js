const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const connect = callback => {
  MongoClient.connect(
    "mongodb+srv://ashish:ZGWTH726EElXwN4C@cluster0-pnhie.mongodb.net/weatherapp?retryWrites=true&w=majority"
  )
    .then(result => {
      _db = result.db();

      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
};

exports.connect = connect;
exports.getDB = getDB;
