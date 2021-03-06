"use strict";

const bcrypt = require("bcrypt");
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
 * @param {String} param - unique of user
 * @returns {Promise<any>}
 */
function findUser(param) {
  return usersModel.findUser({userName: param});
}

/**
 *
 * @param {String} userName - unique value of user data
 * @returns {Promise<any>}
 */
function findUserByNickName(userName) {
  return usersModel.checkUser({userName});
}

/**
 *
 * @param {Object} user
 * @returns {Promise<any>}
 */
function saveUser(user) {
  let {password} = user;
  const {userName} = user;

  return usersModel
    .checkUser({userName})
    .then(foundUser => {
      if (!foundUser) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        return usersModel.saveUser({...user, password: hashPassword});
      }
      return Promise.reject("The user already exists!");
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

module.exports = {
  getUsers,
  findUserByID,
  findUser,
  findUserByNickName,
  saveUser
};
