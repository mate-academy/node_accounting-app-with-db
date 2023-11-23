'use strict';

const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('./db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  }
);

const clearUsers = async() => {
  await User.destroy({ truncate: true });
};

const getAll = async() => {
  const users = await User.findAll({ order: ['name'] });

  return users;
};

const getById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async(name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const remove = async(id) => {
  await User.destroy({ where: { id } });
};

const update = async(id, name) => {
  await User.update({ name }, { where: { id } });
};

module.exports = {
  User,
  getAll,
  getById,
  create,
  remove,
  update,
  clearUsers,
};
