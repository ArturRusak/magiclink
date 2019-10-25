"use strict";

const Router = require("koa-router");
const { findUserByID, getUsers, saveUser } = require("../controllers").users;

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
    await findUserByID(ctx.params.id)
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
      .then(item => {
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