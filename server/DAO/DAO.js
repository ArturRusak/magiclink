'use strict';

const MongoClient = require('mongodb').MongoClient;

/**
 * Data Access Object
 * @param {Object} config - Configuration for connection
 * @constructor
 */
function DAO(config) {
  const {host, port, dbName} = config;
  this.host = host;
  this.port = port;
  this.dbName = dbName;
}

/**
 * Open connection
 * @param {Function} callback
 */
DAO.prototype.connect = (callback) => {
  const client = new MongoClient(`mongodb://${this.host}:${this.port}/${this.dbName}`, {useNewUrlParser: true});

  client.connect((error, db) => {
    if (error) {
      throw new Error(error);
    }
    this.dbConnection = db;
    console.info("Connected successfully to server"); // eslint-disable-line no-console
    callback && callback();
  });
};

/**
 * Init of data
 * @param {Object} data
 * @param {String} data.tableName - name of table
 * @param {Array} data.dataList - list of data
 * @param {Function} callback - indicator of successful init data
 */
DAO.prototype.init = (data, callback) => {
  if (!this.dbConnection) {
    throw new Error('Initial data was failed! Connection not found! Please check the connection!');
  }

  const {tableName, dataList} = data;

  this.dbConnection.collection(tableName).insertMany(dataList);
  callback && callback();
};

/**
 * Close connection
 */
DAO.prototype.close = () => {
  if (!this.dbConnection) {
    throw new Error('Closing of connection was failed! Connection not found! Please check the connection!');
  }
  this.dbConnection.close((error) => {
    if (error) {
      throw new Error(error);
    }
    console.info('Connection have been closed'); // eslint-disable-line no-console
  });
};

module.exports = DAO;