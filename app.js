const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./util/database").connect;
const multer = require("multer");
const path = require("path");

const app = express();

app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
app.use(multer({ storage: fileStorage }).single("image"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(postRoutes);
app.use(authRoutes);

connect(() => {
  app.listen(4000);
});
