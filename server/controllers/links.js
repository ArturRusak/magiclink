const {linksModel} = require("../DAO");
const {linksAPI} = require("../constants");
const md5 = require("md5");

/**
 *
 * @param {String} user - from the session
 * @returns {Promise<any>}
 */
function getLinks(user) {
  return linksModel.getLinks(user);
}

/**
 *
 * @param {String} user - user from session
 * @param {Object} param - id of link
 * @returns {Promise<any>}
 */
function getUsersLinkByParam(user, param) {
  return linksModel.getLinkByParam({userID: user, ...param})
}

/**
 *
 * @param {Object} hash - hash of link
 * @returns {Promise<any>}
 */
function getLinkByHash(hash) {
  const shortLink = `${linksAPI}${hash}`;
  return linksModel.getLinkByParam({shortLink})
}

/**
 *
 * @param {Object} link
 * @returns {Promise<any>}
 */
function addLink(user, {link}) {
  //before of saving search the same link and hash
  return getUsersLinkByParam(user, {link})
    .then(checkedLink => { // TODO check the hash for users.
    if (!checkedLink) {
      const shortLink = `${linksAPI}${md5(link)}`;
      return linksModel.addLink({link, shortLink, userID: user});
    } else {
      return Promise.reject("The link already saved!");
    }

  });
}

module.exports = {
  addLink,
  getLinks,
  getUsersLinkByParam,
  getLinkByHash
};
