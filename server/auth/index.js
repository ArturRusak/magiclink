const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const {users} = require("../controllers");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match user
      users.findUserByNickName(username)
        .then(user => {
          if (!user) {
            return done(null, false, {message: 'The user is not exists!'});
          }

          // Match
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'Password incorrect'});
            }
          });
        })
        .catch(error => done(null, false, {message: error}));
    })
  );

  passport.serializeUser(function (username, done) {
    done(null, {username});
  });

  passport.deserializeUser(function (username, done) {
    User.findById(id, function (err, user) {
      err
        ? done(err)
        : done(null, user);
    });
  });
};
