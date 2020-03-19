const jswt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  console.log(token);
  if (token) {
  }
  let decodedToken;
  try {
    decodedToken = jswt.verify(token, "secretkeyhereplease");
  } catch (error) {
    res.status(201).json({
      message: "Please login to access database"
    });
  }

  if (!decodedToken) {
    console.log("token not verified");
  }

  next();
};
