"use strict";
// @flow
const Koa = require("koa");
const cors = require("@koa/cors");
const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");
const path = require("path");
const { linkRoutes, userRoutes, indexRoute } = require("./routes");
const { DAO } = require("./DAO");
const { links } = require("./data"); // eslint-disable-line no-unused-vars
const config = require("./constants");

const dao = new DAO(config);
const app = new Koa();
app.use(cors());

// eslint-disable-next-line no-undef
app.use(serve(path.join(__dirname, "../client/build")));
app.use(bodyParser());
app.use(indexRoute.routes());
app.use(userRoutes.routes());
app.use(linkRoutes.routes());

dao.connect(() => {
  const initData = {
    collectionName: "links",
    dataList: links
  };
  // eslint-disable-next-line no-console
  /*dao.clear(initData, dao.init.bind(dao));*/
});

app.listen(3001, () => {
  console.log(`Server listening on port: 3001`); // eslint-disable-line no-console
});
