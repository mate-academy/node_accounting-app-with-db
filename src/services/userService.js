'use strict';

const { generateUniqueID } = require('../helpers.js');
const { User } = require('../db.js');

const findUser = async(id) => User.findByPk(id);
const updateUser = async(propsToUpdate, id) =>
  User.update(propsToUpdate, {
    where: {
      id,
    },
  });
const getAllUsers = async() => User.findAll();
const addNewUser = async(newUser) => User.create(newUser);
const deleteUserById = async(id) =>
  User.destroy({
    where: {
      id,
    },
  });

module.exports = {
  findUser,
  getAllUsers,
  addNewUser,
  generateUniqueID,
  deleteUserById,
  updateUser,
};
