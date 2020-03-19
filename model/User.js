const getDB = require("../util/database").getDB;

class User {
  constructor(email, password) {
    (this.email = email), (this.password = password);
  }

  save() {
    return getDB()
      .collection("users")
      .insertOne(this);
  }

  static findUserByEmail(email) {
    return getDB()
      .collection("users")
      .findOne({ email: email });
  }
}

module.exports = User;
