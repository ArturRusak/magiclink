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
}

module.exports = new LinksModel();