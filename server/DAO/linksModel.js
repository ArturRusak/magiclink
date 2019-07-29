const BaseModel = require('./BaseModel');

class LinksModel extends BaseModel {
  constructor() {
    super();
    this.collectionName = 'links';
  }

  /**
   * Get all records
   * @returns {Promise<any>}
   */
  getLinks() {
    const { db, collectionName } = this;
    return new Promise((resolve, reject) => {
      db.collection(collectionName).find().toArray((error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
      });
    });
  }

  /**
   *
   * @param {String} id
   * @returns {Promise<any>}
   */
  getLinkById(id) {
    const { db, collectionName } = this;
    return new Promise((resolve, reject) => {
      db.collection(collectionName).findOne({id}, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve(result);
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
        resolve(result);
      })
    });
  }
}

module.exports = new LinksModel();