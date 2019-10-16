"use strict";

const bcrypt = require("bcrypt");
const { usersModel } = require("../DAO");

/**
 * @param {Object} user
 * @returns {Promise<any>}
 */
function saveUser(user) {
  let { password } = user;
  const {username} = user;

  return usersModel
    .checkUser({username})
    .then(foundUser => {
      if (!foundUser) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        return usersModel.saveUser({ ...user, password: hashPassword });
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
