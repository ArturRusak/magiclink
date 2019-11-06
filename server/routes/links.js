"use strict";

const Router = require("koa-router");
const ObjectId = require("mongodb").ObjectId;
const {authenticated} = require("../auth");
const {getLinks, getUsersLinkByParam, getLinkByHash, addLink} = require("../controllers").links;

const router = new Router();

router
  .get("/app/:hash", async ctx => {
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
  })
  .get("/links", authenticated(), async ctx => {
    const {passport} = ctx.session;
    const {user} = passport;
    await getLinks(user)
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
          data: error
        };
      });
  })
  .get("/links/:id", authenticated(), async ctx => {
    const _id = new ObjectId(ctx.params.id);
    const {passport} = ctx.session;
    const {user} = passport;

    await getUsersLinkByParam(user, {_id})
      .then(link => {
        ctx.body = {
          ...ctx.body,
          status: "success",
          data: link
        };
      })
      .catch(error => {
        ctx.body = {
          ...ctx.body,
          status: "error",
          data: error
        };
      });
  })
  .post("/links", async ctx => {
    const link = ctx.request.body;
    const {passport} = ctx.session;
    const {user} = passport;

    await addLink(user, link)
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
          data: error
        };
      });
  });

module.exports = router;
