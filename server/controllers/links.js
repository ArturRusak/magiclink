const {linksModel} = require("../DAO");
const md5 = require("md5");

/**
 *
 * @returns {Promise<any>}
 */
function getLinks() {
  return linksModel.getLinks();
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
