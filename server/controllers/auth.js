"use strict";

const bcrypt = require("bcrypt");
const {usersModel} = require("../DAO");

/**
 * @param {Object} user
 * @returns {Promise<any>}
 */
function checkUser(user) {
  return usersModel.findUser(user);
}

/**
 * @param {Object} user
 * @returns {Promise<any>}
 */
function saveUser(user) {
  let {password} = user;
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  return usersModel.saveUser({...user, password});
}

module.exports = {
  checkUser,
  saveUser
};
