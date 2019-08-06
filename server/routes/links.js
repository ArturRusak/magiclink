"use strict";

const Router = require("koa-router");
const { getLinks, getLinkByParam, addLink } = require("../controllers").links;

const router = new Router();

router
  .get("/links", async ctx => {
    await getLinks()
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
  .get("/links/:id", async ctx => {
    await getLinkByParam({ id: ctx.params.id })
      .then(link => {
        ctx.body = {
          status: "success",
          data: link
        };
      })
      .catch(error => {
        ctx.body = {
          status: "error",
          data: error
        };
      });
  })
  .post("/links", async ctx => {
    await addLink(ctx.request.body)
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
