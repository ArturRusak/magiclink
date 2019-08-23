"use strict";

const Router = require("koa-router");
const ObjectId = require("mongodb").ObjectId;
const { findUser, getUsers, saveUser } = require("../controllers").users;

const router = new Router();

router
  .get("/users", async ctx => {
    await getUsers()
      .then(links => {
        ctx.body = {
          status: "success",
          data: links
        };
      })
      .catch(error => {
        ctx.body = {
          status: "error",
          data: error
        };
      });
  })
  .get("/users/:id", async ctx => {
    const _id = new ObjectId(ctx.params.id);
    await findUser({ _id })
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
  })
  .post("/users", async ctx => {
    await saveUser(ctx.request.body)
      .then((item) => {
        ctx.body = {
          status: "success",
          data: item
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
