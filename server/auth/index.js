"use strict";

const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;

const user = {
  id: "test",
  password: "123"
};

const options = {};

passport.serializeUser((user, done) => {
  console.log(user, "->>>>>SERIALIZE");
  /*done(null, user.user)*/
});
/*passport.deserializeUser((id, done) => ({user: "test"}));*/

passport.use(new LocalStrategy(options, (user, password, done) => {
  done(null, { user: "test" });
}));