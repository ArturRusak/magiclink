const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const {users} = require("../controllers");

function initPassport(passport) {
  passport.use(
    new LocalStrategy({usernameField: 'userName'}, (username, password, done) => {
      // Match user
      users
        .findUserByNickName(username)
        .then(user => {
          if (!user) {
            return done(null, false, {data: "The user is not exists!"});
          }

          // Match
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
              return done(null, false, {data: error});
            }
            if (!isMatch) {
              return done(null, false, {data: "Password is incorrect!"});
            }
            return done(null, user);
          });
        })
        .catch(error => done(null, false, {data: error}));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.userName);
  });

  passport.deserializeUser(function (username, done) {
    users
      .findUser(username)
      .then(user => {
        if (user) {
          done(null, user);
        }
        return done("Something was wrong!");
      })
      .catch(error => {
        return done(error);
      });
  });
}

function authenticated() {
  return (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    } else {
      ctx.status = 401;
    }
  };
}

module.exports = {
  initPassport,
  authenticated
};
