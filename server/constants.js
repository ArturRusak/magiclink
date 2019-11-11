"use strict";

const host = "localhost"; //database url
const port = "27017";
const dbName = "magicLink";
const linksTable = "links";
const linksAPI = "http://localhost:3001/api/";

module.exports = {
  host,
  port,
  dbName,
  linksTable,
  linksAPI
};
