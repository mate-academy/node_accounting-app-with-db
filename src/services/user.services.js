'use strict';

const { User } = require('../models/User.model.js');

const getAllUsers = async() => {
  const users = await User.findAll();

  return users;
};

const getUserById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = async(name) => {
  const newUser = await User.create({
    name,
  });

  return newUser;
};

const updateUser = async(id, name) => {
  const [ , updatedRows ] = await User.update({ name }, {
    where: { id },
    returning: true,
  });

  return updatedRows[0];
};

const deleteUser = async(id) => {
  const deletedUser = await User.destroy({ where: { id } });

  return deletedUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
