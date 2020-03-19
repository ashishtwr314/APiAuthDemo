const Posts = require("../model/Posts");

exports.getAllPosts = (req, res, next) => {
  Posts.fetchAll()
    .then(posts => {
      res.status(201).json({
        posts: posts
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.createPost = (req, res, next) => {
  const { title, desc, author, date, image } = req.body;
  const imageUrl = req.file.path;
  const post = new Posts(title, desc, author, date, imageUrl);
  post
    .save()
    .then(result => {
      res.status(201).json({
        message: "POST successfully uploaded"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getPostDetails = (req, res, next) => {
  Posts.findById(req.params.id)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deletePost = (req, res, next) => {
  Posts.deleteById(req.params.id)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.editPost = (req, res, next) => {
  const { title, desc, author, date } = req.body;

  Posts.edit(req.params.id, title, desc, author, date)
    .then(result => {
      res.status(201).json({
        message: "Successfully Update"
      });
    })
    .catch(err => {
      console.log(err);
    });
};
