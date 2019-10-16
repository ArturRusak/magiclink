const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { users } = require("../controllers");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match user
      users
        .findUserByNickName(username)
        .then(user => {
          if (!user) {
            return done(null, false, { message: "The user is not exists!" });
          }

          // Match
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
              return done(null, false, { message: error });
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch(error => done(null, false, { message: error }));
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {

    users
      .findUser(username)
      .then(user => {
        if (user) {
          done(null, username);
        }
        return done("Something was wrong!");
      })
      .catch(error => {
        return done(error);
      });
  });
};
