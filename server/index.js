'use strict';

const { DAO } = require('./DAO');
const config = require('./constants');
const data = require('../data');

const dao = new DAO(config);

dao.connect(() => {
  const initData = {
    tableName: 'links',
    dataList: data
  };
  dao.init(initData, dao.close);
});


