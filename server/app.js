"use strict";
// @flow
const Koa = require("koa");
const cors = require("@koa/cors");
const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");
const path = require("path");
const route = require("./routes");
const { DAO } = require("./DAO");
const { initPassport } = require("./auth");

const { data } = require("./data"); // eslint-disable-line no-unused-vars
const config = require("./constants");

const passport = require("koa-passport"); //реализация passport для Koa
const session = require("koa-session");

const dao = new DAO(config);
const app = new Koa();
const SESSION_CONFIG = {};

// sessions
app.keys = ["super-secret-key"];
app.use(session(SESSION_CONFIG, app));

// CORS
app.use(cors());

// eslint-disable-next-line no-undef
app.use(serve(path.join(__dirname, "../client/build")));
app.use(bodyParser());

initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(route.routes());

dao.connect(() => {
  /* const initData = [
    {
      collectionName: "links",
      dataList: data.linksList
    },
    {
      collectionName: "users",
      dataList: data.users
    },
  ];
  // eslint-disable-next-line no-console
 initData.forEach(data => {
    dao.clear(data, dao.init.bind(dao));
  });*/
});

app.listen(3001, () => {
  console.log(`Server listening on port: 3001`); // eslint-disable-line no-console
});
