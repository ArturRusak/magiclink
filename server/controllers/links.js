const {linksModel} = require("../DAO");
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
 * @param {Object} param
 * @returns {Promise<any>}
 */
function getLinkByParam(param) {
  return linksModel.getLinkByParam(param);
}

/**
 *
 * @param {Object} link
 * @returns {Promise<any>}
 */
function addLink(link) {
  //before of saving search the same link and hash
  return getLinkByParam({link: link.link}).then(checkedLink => {
    if (!checkedLink) {
      let hash = null;
      let uniqueHash = null;
      while (uniqueHash) {
        //Create and check the same hash
        hash = md5(link.link);
        (async function () {
          uniqueHash = await getLinkByParam({hash});
        })();
      }

      return linksModel.addLink({...link, hash});
    } else {
      return Promise.reject("The link already saved!");
    }
  });
}

module.exports = {
  addLink,
  getLinks,
  getLinkByParam
};
