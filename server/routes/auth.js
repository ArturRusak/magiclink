"use strict";

const Router = require("koa-router");
const passport = require("koa-passport");
const {saveUser} = require("../controllers").users;

const router = new Router();

router
  .post("/login", async ctx => {
    return passport.authenticate("local", (error, user, info) => {
      if (!user) {
        ctx.body = {
          ...info,
          status: "error"
        };
      } else {
        ctx.body = {
          status: "success",
          currentUser: user.userName
        };
        return ctx.login(user);
      }
    })(ctx);
  })
  .get("/logout", async ctx => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.status = 200;
    } else {
      ctx.body = {
        ...ctx.body,
        success: false
      };
      ctx.throw(401);
    }
  })
  .post("/registration", async ctx => {
    await saveUser(ctx.request.body)
      .then(user => {
        ctx.body = {
          ...ctx.body,
          status: "success",
          data: user
        };
      })
      .catch(error => {
        ctx.body = {
          ...ctx.body,
          status: "error",
          data: {
            message: error
          }
        };
      });
  });

module.exports = router;
