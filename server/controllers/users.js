const { userModel } = require("../DAO");

/**
 *
 * @returns {Promise<any>}
 */
function getUsers() {
  return userModel.getUsers();
}

/**
 *
 * @param {Object} param
 * @returns {Promise<any>}
 */
function findUser(param) {
  return userModel.findUser(param);
}

/**
 *
 * @param {Object} user
 * @returns {Promise<any>}
 */
function saveUser(user) {
  return userModel.saveUser(user);
}

module.exports = {
  getUsers,
  findUser,
  saveUser
};