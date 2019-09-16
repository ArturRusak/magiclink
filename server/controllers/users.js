const { usersModel } = require("../DAO");

/**
 *
 * @returns {Promise<any>}
 */
function getUsers() {
  return usersModel.getUsers();
}

/**
 *
 * @param {Object} param
 * @returns {Promise<any>}
 */
function findUser(param) {
  return usersModel.findUser(param);
}

/**
 *
 * @param {Object} user
 * @returns {Promise<any>}
 */
function saveUser(user) {
  return usersModel.saveUser(user);
}

module.exports = {
  getUsers,
  findUser,
  saveUser
};