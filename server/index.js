'use strict';
// @flow

const { DAO } = require('./DAO');
const { links } = require('./data');
const config = require('./constants');

const dao = new DAO(config);

dao.connect(() => {
  const initData = {
    tableName: 'links',
    dataList: links
  };
  dao.init(initData, dao.close.bind(dao));
});


