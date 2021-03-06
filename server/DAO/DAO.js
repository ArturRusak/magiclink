"use strict";

const link = require("./linksModel");
const user = require("./usersModel");
const MongoClient = require("mongodb").MongoClient;

/*type Config = {
  host: string,
  port: string,
  dbName: string
};

type Data = {
  collectionName: string,
  dataList: Array<Object>
}*/

/**
 * Data Access Object
 * @param {Object} config - Configuration for connection
 * @constructor
 */
class DAO {
  /*
  host: string;
  port: string;
  dbName: string;
  dbConnection: Object;
  db: Object;
*/

  constructor(config) {
    const { host, port, dbName } = config;

    this.host = host;
    this.port = port;
    this.dbName = dbName;
  }

  /**
   * Open connection
   * @param {Function} callback
   */
  connect(callback) {
    const client = new MongoClient(`mongodb://${this.host}:${this.port}`, {
      useNewUrlParser: true
    });

    client.connect((error, client) => {
      if (error) {
        throw new Error(error);
      }
      this.dbConnection = client;
      this.db = client.db(this.dbName);
      link.setConnection(this.db);
      user.setConnection(this.db);
      console.info("\x1b[32m", "\nConnected successfully to server"); // eslint-disable-line no-console
      callback && callback();
    });
  }

  /**
   * Init of data
   * @param {Object} data
   * @param {String}collectionName - name of table
   * @param {Array} dataList - array list of data
   * @param {Function} callback - indicator of successful init data
   */
  init({ collectionName, dataList }, callback) {
    if (!this.dbConnection) {
      throw new Error(
        "\nInitial data was failed! Connection not found! Please check the connection!"
      );
    }
    this.db.collection(collectionName).insertMany(dataList, error => {
      if (error) {
        throw new Error("\nError of initial insert data!");
      }
      callback && callback();
    });
  }

  /**
   * Clear of data
   * @param {String} collectionName - name of collection
   * @param {Array} dataList - list of links
   * @param {Function} callback - indicator of successful init data
   */
  clear({ collectionName, dataList }, callback) {
    if (!this.dbConnection) {
      throw new Error(
        "\nInitial data was failed! Connection not found! Please check the connection!"
      );
    }
    this.db.collection(collectionName).deleteMany({}, error => {
      if (error) {
        throw new Error("\nDrop collection error!", error);
      }
      callback &&
        callback(
          {
            collectionName,
            dataList
          }
        ); // eslint-disable-line no-console
    });
  }

  /**
   * Close connection
   */
  close() {
    if (!this.dbConnection) {
      throw new Error(
        "\nClosing of connection was failed! Connection not found! Please check the connection!"
      );
    }
    this.dbConnection.close(error => {
      if (error) {
        throw new Error(error);
      }
      console.info("\x1b[36m", "\nConnection have been closed!"); // eslint-disable-line no-console
    });
  }
}

module.exports = DAO;
