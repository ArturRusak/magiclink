"use strict";

const Router = require("koa-router");
const passport = require("koa-passport");
const { saveUser } = require("../controllers").auth;

const router = new Router();

router
  .post(
    "/login",
    passport.authenticate("local"),
    async ctx => ctx.status = 200
  )
  .get("/logout", async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.status = 200;
    } else {
      ctx.body = { success: false };
      ctx.throw(401);
    }
  })
  .post("/registration", async ctx => {
    await saveUser(ctx.request.body)
      .then(user => {
        ctx.body = {
          status: "success",
          data: user
        };
      })
      .catch(error => {
        ctx.body = {
          status: "error",
          data: error
        };
      });
  });

module.exports = router;
