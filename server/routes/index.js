"use strict";

const authRouters = require("./auth");
const linkRoutes = require("./links");
const userRoutes = require("./users");

const Router = require("koa-router");
const router = new Router();

router.use(authRouters.routes());

router.use(async (ctx, next) => {
  console.log(ctx.session.passport.user);
  if (ctx.isAuthenticated()) {
    ctx.body = {
      ...ctx.body,
      currentUser: ctx.session.passport.user ? ctx.session.passport.user : null
    };
  }
  console.log(ctx.body);
  await next();
});
router.use(linkRoutes.routes());
router.use(userRoutes.routes());

module.exports = router;
