"use strict";

const authRouters = require("./auth");
const linkRoutes = require("./links");
const userRoutes = require("./users");

const Router = require("koa-router");
const route = new Router();

route.get("/", async ctx => {
  ctx.body = "Hello World!";
});
route.use(authRouters.routes());
route.use(linkRoutes.routes());
route.use(userRoutes.routes());

module.exports = route;
