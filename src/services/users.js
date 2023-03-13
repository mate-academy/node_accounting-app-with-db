'use strict';

const { User } = require('../models/user');

const getUsers = async() => User.findAll();

const getUser = async(userId) => {
  return User.findByPk(userId);
};

const createUser = async(name) => {
  return User.create({
    name,
  });
};

const updateUser = ({ id, name }) => {
  return User.update({ name: name }, {
    where: {
      id: id,
    },
  });
};

const deleteUser = (userId) => {
  return User.destroy({
    where: {
      id: userId,
    },
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
