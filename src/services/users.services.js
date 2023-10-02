/* eslint-disable space-before-function-paren */
'use strict';

const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

const normalizeUser = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAllUsers = async () => {
  return User.findAll({
    order: [['createdAt', 'DESC']],
  });
};

const getByIdUser = (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  return User.create({ name });
};

const updateUser = async (id, name) => {
  await User.update({ name }, { where: { id } });
};

const deleteUser = async (id) => {
  await User.destroy({
    where: { id },
  });
};

module.exports = {
  getAllUsers,
  getByIdUser,
  createUser,
  updateUser,
  deleteUser,
  User,
  normalizeUser,
};
