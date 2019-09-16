const BaseModel = require("./BaseModel");

class UsersModel extends BaseModel {
  constructor() {
    super();
    this.collectionName = "users";
  }

  /**
   * Get all records
   * @returns {Promise<any>}
   */
  getUsers() {
    const { db, collectionName } = this;
    return new Promise((resolve, reject) => {
      db.collection(collectionName)
        .find()
        .toArray((error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
    });
  }

  /**
   *
   * @param {Object} param
   * @returns {Promise<any>}
   */
  findUser(param) {
    const { db, collectionName } = this;
    return new Promise((resolve, reject) => {
      db.collection(collectionName).findOne(param, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }

  /**
   *
   * @param {Object} newUser
   * @returns {Promise<any>}
   */
  saveUser(newUser) {
    const { db, collectionName } = this;
    return new Promise((resolve, reject) => {
      db.collection(collectionName).insertOne(newUser, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.ops[0]);
      });
    });
  }
}

module.exports = new UsersModel();