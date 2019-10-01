"use strict";

const Router = require("koa-router");
const { usersModel } = require("../DAO");

const router = new Router();

router.post("/login", async ctx => {
  const { userName, password } = ctx.request.body;
  await usersModel
    .findUser({ userName })
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

module.exports = router;
