'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

const getAll = async() => {
  const data = await User.findAll();

  return data;
};

const getById = async(id) => {
  return User.findByPk(id);
};

const create = async(name) => {
  return User.create({ name });
};

const update = async({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

const remove = async(id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  User,
};
