'use strict';

const { sequelize } = require('../db.js');
const { User } = require('../models/user.js');

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAll = async() => {
  const users = await User.findAll({
    order: [['createdAt', 'DESC']],
  });

  return users;
};

const createUser = (name) => {
  return User.create({ name });
};

const getUserById = async(userId) => {
  return User.findByPk(userId);
};

const removeUser = async(userId) => {
  await sequelize.transaction(async(t) => {
    await User.destroy({
      where: { id: userId },
    });
  });
};

const updateUser = async(userId, name) => {
  await User.update({ name }, { where: { id: userId } });
};

module.exports = {
  normalize,
  getAll,
  createUser,
  getUserById,
  removeUser,
  updateUser,
};
