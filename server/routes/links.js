"use strict";

const Router = require("koa-router");
const ObjectId = require("mongodb").ObjectId;
const passport = require("koa-passport");
const { getLinks, getLinkByParam, addLink } = require("../controllers").links;

const router = new Router();

router
  .get(
    "/links",
    /*    passport.authenticate("local", {
          failureRedirect: "/login"
        }),*/
    async ctx => {
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
    }
  )
  .get("/links/:id", async ctx => {
    const _id = new ObjectId(ctx.params.id);
    await getLinkByParam({ _id })
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
