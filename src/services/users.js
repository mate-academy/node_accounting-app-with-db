/* eslint-disable no-console */
'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db.js');

const User = sequelize.define('User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  },
);

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(userId) => {
  const user = await User.findByPk(+userId);

  return user;
};

const create = async(name) => {
  const userToPush = await User.create({ name });

  return userToPush;
};

const remove = async(userId) => {
  const userToRemove = await User.destroy({
    where: { id: +userId },
  });

  return userToRemove;
};

const update = async(userId, name) => {
  await User.update({ name }, {
    where: { id: +userId },
  });

  return getById(userId);
};

module.exports = {
  User,
  getAll,
  getById,
  create,
  remove,
  update,
};
