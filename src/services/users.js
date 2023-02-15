'use strict';

const { User } = require('../models/users');

const getAllUsers = () => {
  const allUsers = User.findAll({ order: ['id'] });

  return allUsers;
};

const getUserById = (userId) => {
  const neededUser = User.findByPk(userId);

  return neededUser;
};

const addUser = async(name) => {
  const allUsers = await User.findAll({ order: ['id'] });

  const maxId = Math.max(...allUsers.map(user => user.id));

  const id = allUsers.length ? maxId + 1 : 0;

  return User.create({
    id,
    name,
  });
};

const deleteUser = (userId) => {
  return User.destroy({
    where: { id: Number(userId) },
  });
};

const updateUser = (foundUser, name) => {
  const id = foundUser.id;

  return User.update({ name }, {
    where: { id },
    returning: true,
    plain: true,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
};
