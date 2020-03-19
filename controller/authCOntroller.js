const User = require("../model/User");
const bcryt = require("bcrypt");
const jswt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
  const password = req.body.password;
  //   console.log(req.body.email, req.body.password);
  bcryt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User(req.body.email, hashedPw);
      user
        .save()
        .then(result => {
          res.status(200).json({
            message: "Signup Successfull"
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
  //
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  User.findUserByEmail(email)
    .then(user => {
      if (user) {
        console.log(user);
        bcryt
          .compare(password, user.password)
          .then(passMatched => {
            if (passMatched) {
              const jswtoken = jswt.sign(
                {
                  email: user.email,
                  id: user._id.toString()
                },
                "secretkeyhereplease",
                { expiresIn: "1h" }
              );
              res.status(200).json({
                token: jswtoken
              });
            } else {
              res.status(422).json({
                message: "Passwords Dont Match"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("No user Exists");
      }
    })
    .catch(err => {
      console.log("No user exists" + err);
    });
};
