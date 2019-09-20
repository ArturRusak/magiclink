"use strict";
// @flow
const Koa = require("koa");
const cors = require("@koa/cors");
const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");
const path = require("path");
const route = require("./routes");
const { DAO } = require("./DAO");
const { links } = require("./data"); // eslint-disable-line no-unused-vars
const config = require("./constants");

const passport = require("koa-passport"); //реализация passport для Koa
const session = require("koa-session");
const LocalStrategy = require("passport-local"); //локальная стратегия авторизации
const JwtStrategy = require("passport-jwt").Strategy; // авторизация через JWT
const ExtractJwt = require("passport-jwt").ExtractJwt; // авторизация через JWT
const crypto = require("crypto"); // модуль node.js для выполнения различных шифровальных операций, в т.ч. для создания хэшей.

const dao = new DAO(config);
const app = new Koa();

// sessions
app.keys = ["super-secret-key"];
app.use(session(app));

// CORS
app.use(cors());

// eslint-disable-next-line no-undef
app.use(serve(path.join(__dirname, "../client/build")));
app.use(bodyParser());


app.use(passport.initialize());
app.use(passport.session());

app.use(route.routes());

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
