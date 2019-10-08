const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const {usersModel} = require("../DAO");

module.exports = function (passport) {

  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match user
      console.log(username, password, "--------");
      done(null, {username, password})
      /*  User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });*/
    })
  );

  passport.serializeUser(function ({username}, done) {
    console.log(1111111, username)
    done(null, {test: username});
  });

  passport.deserializeUser(function (username, done) {
    done(null, '1');
  });
};
