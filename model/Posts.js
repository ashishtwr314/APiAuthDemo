const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");

class Posts {
  constructor(title, description, author, date, imageUrl) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.date = date;
    this.imageUrl = imageUrl;
  }

  static fetchAll() {
    return getDB()
      .collection("posts")
      .find()
      .toArray();
  }

  save() {
    return getDB()
      .collection("posts")
      .insertOne(this);
  }

  static findById(_id) {
    return getDB()
      .collection("posts")
      .findOne({ _id: new mongodb.ObjectID(_id) });
  }

  static deleteById(_id) {
    return getDB()
      .collection("posts")
      .deleteOne({ _id: new mongodb.ObjectID(_id) });
  }
  static edit(_id, title, desc, author, date) {
    return getDB()
      .collection("posts")
      .updateOne(
        { _id: new mongodb.ObjectID(_id) },
        {
          $set: {
            title: title,
            description: desc,
            author: author,
            date: date
          }
        }
      );
  }
}

module.exports = Posts;
