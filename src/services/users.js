'use strict';

const { User } = require('../models/User');

const getUserById = async(userId) => {
  const user = await User.findByPk(userId);

  return user;
};

const getUsers = async() => {
  const users = await User.findAll({
    order: ['createdAt'],
  });

  return users;
};

const addUser = async(name) => {
  const user = await User.create({ name });

  return user;
};

const updateUser = async(userId, name) => {
  const user = await User.update({ name }, {
    where: {
      id: +userId,
    },
  });

  return user;
};

const deleteUser = (userId) => {
  return User.destroy({
    where: {
      id: +userId,
    },
  });
};

const normalize = (user) => ({
  id: user.id,
  name: user.name,
});

module.exports = {
  getUserById,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  normalize,
};
