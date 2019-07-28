'use strict';
// @flow
const Koa = require('koa');
const Router = require('koa-router');
const { DAO } = require('./DAO');
const { links } = require('./data');
const config = require('./constants');

const dao = new DAO(config);
const app = new Koa();
const router = new Router();

app.use('', )


dao.connect(() => {
  const initData = {
    tableName: 'links',
    dataList: links
  };
  dao.init(initData, () => {console.log('CALLBACK SUCCESS');});
});


