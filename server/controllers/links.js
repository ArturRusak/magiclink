const {linksModel} = require('../DAO');

function getLinks() {
  return linksModel.getLinks();
}

module.exports = {
  getLinks
};