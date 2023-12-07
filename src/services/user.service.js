'use strict';

const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAllUsers = async() => {
  const result = await User.findAll();

  return result;
};

const createUser = (name) => {
  return User.create({ name });
};

const getUser = (id) => {
  return User.findByPk(id);
};

const deleteUser = async(id) => {
  await User.destroy({ where: { id } });
};

const updateUser = async({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  User,
  normalize,
};
