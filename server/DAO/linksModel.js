const BaseModel = require("./BaseModel");

class LinksModel extends BaseModel {
  constructor() {
    super();
    this.collectionName = "links";
  }

  /**
   * Get all records
   * @returns {Promise<any>}
   */
  getLinks(user) {
    const {db, collectionName} = this;
    return new Promise((resolve, reject) => {
      db.collection(collectionName)
        .find({userID: user})
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
   * @param {Object} param - id of link
   * @returns {Promise<any>}
   */
  getLinkByParam(param) {
    const {db, collectionName} = this;
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
   * @param {Object} id
   * @param {String} id._id - Id of link
   */
  removeLink(id) {
    const {db, collectionName} = this;
    return new Promise((resolve, reject) => {
      db.collection(collectionName).deleteOne(id, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve({deletedCount: result.deletedCount});
      });
    });
  }

  /**
   *
   * @param {Object} newLink
   * @returns {Promise<any>}
   */
  addLink(newLink) {
    const {db, collectionName} = this;
    return new Promise((resolve, reject) => {
      db.collection(collectionName).insertOne(newLink, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.ops[0]);
      });
    });
  }
}

module.exports = new LinksModel();
