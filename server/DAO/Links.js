const BaseModel = require('./BaseModel');

class Links extends BaseModel {
  constructor() {
    super();
    this.collectionName = 'links';
  }

  async getAllLinks () {
    const { db, collectionName } = this;
    await db.collection(collectionName).find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }
}

module.exports = new Links();