'use strict';

const { DAO } = require('./DAO');
const config = require('./constants');
const {links} = require('../data');

const dao = new DAO(config);

dao.connect(() => {
  const initData = {
    tableName: 'links',
    dataList: links
  };
  dao.init(initData, dao.close.bind(dao));
});


