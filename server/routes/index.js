"use strict";

const linkRoutes = require("./links");
const userRoutes = require("./users");

const Router = require("koa-router");
const router = new Router();

router.get("/", async ctx => {
  ctx.body = "Hello World!";
});

module.exports = {
  linkRoutes,
  userRoutes,
  indexRoute: router
};
