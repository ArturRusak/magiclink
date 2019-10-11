"use strict";

const bcrypt = require("bcrypt");
const { usersModel } = require("../DAO");

/**
 * @param {Object} user
 * @returns {Promise<any>}
 */
function saveUser(user) {
  let { password } = user;
  const { userName } = user;

  return usersModel
    .checkUser({ userName })
    .then(foundUser => {
      if (!foundUser) {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        return usersModel.saveUser({ password, ...user });
      }
      return Promise.reject("The user already exists!");
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

module.exports = {
  saveUser
};
