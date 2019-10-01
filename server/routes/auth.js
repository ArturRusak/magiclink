"use strict";

const Router = require("koa-router");

const router = new Router();

router.post("/login", async (ctx, next) => {
  await function() {
    const { userName, password } = ctx.request.body;
    console.log(userName, password);
  }();
});

module.exports = router;