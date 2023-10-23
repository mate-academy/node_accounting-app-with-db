'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
});

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const add = async(newUser) => {
  const user = await User.create(newUser);

  return user;
};

const update = async(id, name) => {
  const user = await User.update({ name }, { where: { id } });

  return user;
};

const remove = async(id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
