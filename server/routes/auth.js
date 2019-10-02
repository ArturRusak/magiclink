"use strict";

const Router = require("koa-router");
const {checkUser, saveUser} = require("../controllers").auth;

const router = new Router();

router.post("/login", async ctx => {
  const { userName, password } = ctx.request.body;
  await checkUser({userName})
    .then(user => {
      if (user) {
        const { password: userPassword } = user;
        if (password === userPassword) {
          ctx.body = {
            status: "success",
            data: user
          };
          return;
        }
        const result = `${password} - input password \n ${userPassword} - got password`;
        console.log(result);
        ctx.body = {
          status: "success",
          data: result
        };
      }
    })
    .catch(error => {
      ctx.body = {
        status: "error",
        data: error
      };
    });
});

router.post("/registration", async ctx => {
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
