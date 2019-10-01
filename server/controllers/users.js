"use strict";

const ObjectId = require("mongodb").ObjectId;
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
 * @param {String} id - unique of user
 * @returns {Promise<any>}
 */
function findUserByID(id) {
  const _id = new ObjectId(id);
  return usersModel.findUser({ _id });
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
  findUserByID,
  saveUser
};
