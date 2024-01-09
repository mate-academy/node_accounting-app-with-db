'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./db.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async(name) => {
  const user = await User.create({ name });

  return user;
};

const update = async({ id, name }) => {
  await User.update({ name }, {
    where: {
      id,
    },
  });
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports.userService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
