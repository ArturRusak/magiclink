const {linksModel} = require('../DAO');

/**
 *
 * @returns {Promise<any>}
 */
function getLinks() {
  return linksModel.getLinks();
}

/**
 *
 * @param {String} id
 * @returns {Promise<any>}
 */
function getLinkById(id) {
  return linksModel.getLinkById(id);
}

/**
 *
 * @param {Object} link
 * @returns {Promise<any>}
 */
function addLink(link) {
  return linksModel.addLink(link);
}

module.exports = {
  addLink,
  getLinks,
  getLinkById
};