const { linksModel } = require("../DAO");
const bcrypt = require("bcrypt");
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
  let hash = md5(link.hash);

  return new Promise((resolve, reject) => {
    getLinkByParam({ link: link.link })
      .then(foundLink => {
        if (!foundLink) {
          getLinkByParam({ hash: "0800fc577294c34e0b28ad2839435945" })
            .then(foundHash => {
              if (!foundHash) {
                resolve(linksModel.addLink({ ...link, hash }));
              } else {
                hash = md5(link.hash);
              }
            });
        } else {
          reject("The link already saved!");
        }
      });
  });
}

module.exports = {
  addLink,
  getLinks,
  getLinkByParam
};
