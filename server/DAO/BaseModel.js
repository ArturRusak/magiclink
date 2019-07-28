class BaseModel {
  /**
   * Set of connection
   * @param {Object} db - connection to datatable
   */
  setConnection(db) {
    this.db = db;
  }
}

module.exports = BaseModel;