"use strict";

const Router = require("koa-router");
const { findUserByID, getUsers, saveUser } = require("../controllers").users;

const router = new Router();

router
  .get("/users", async ctx => {
    await getUsers()
      .then(links => {
        ctx.body = {
          ...ctx.body,
          status: "success",
          data: links
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
  })
  .get("/users/:id", async ctx => {
    await findUserByID(ctx.params.id)
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
  })
  .post("/users", async ctx => {
    await saveUser(ctx.request.body)
      .then(item => {
        ctx.body = {
          ...ctx.body,
          status: "success",
          data: item
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
