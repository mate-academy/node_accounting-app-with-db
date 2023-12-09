'use strict';

const sequelize = require('../database/db');
const { DataTypes, UUIDV4 } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,

  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
});

const getAll = async() => {
  const user = await User.findAll();

  return user;
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = async(name) => {
  const user = await User.create({ name });

  return user;
};

const update = async(id, name) => {
  await User.update({ name }, { where: { id } });
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
