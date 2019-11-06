"use strict";

const Router = require("koa-router");
const {getLinkByHash} = require("../controllers").links;

const router = new Router();

router
  .get("/api/:hash", async ctx => {
    const hash = ctx.params.hash;
    await getLinkByHash(hash)
      .then(({link}) => {
        ctx.redirect(link)
      })
      .catch(error => {
        ctx.body = {
          ...ctx.body,
          status: "error",
          data: error
        };
      });
  });

module.exports = router;
