const { linksModel } = require("../DAO");
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
  let hash = "";
  //before of saving search the same link and hash
  return getLinkByParam({ link: link.link })
    .then(foundLink => {
      if (!foundLink) {
        hash = md5(link.link);
        return getLinkByParam({ hash });
      } else {
        throw "The link already saved!";
      }
    })
    .then(foundHash => {
      if (!foundHash) {
        return linksModel.addLink({ ...link, hash });
      } else {
        //TODO fix search of duplicate HASH
        while (!foundHash) {
          hash = md5(link.hash);
          return getLinkByParam({ hash: "0800fc577294c34e0b28ad2839435945" });
        }
      }
    });
}

module.exports = {
  addLink,
  getLinks,
  getLinkByParam
};
