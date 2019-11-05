"use strict";

const authRouters = require("./auth");
const linkRoutes = require("./links");
const userRoutes = require("./users");
const {authenticated} = require("../auth");

const Router = require("koa-router");
const router = new Router();

router.use(authRouters.routes());

router.use(async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    const {passport} = ctx.session;
    ctx.body = {
      ...ctx.body,
      currentUser: passport.user ? passport.user : null
    };
  }
  await next();
});
router.get("/check-auth", authenticated(), async ctx => {
  ctx.body = {
    ...ctx.body
  }
});
router.use(linkRoutes.routes());
router.use(userRoutes.routes());

module.exports = router;
