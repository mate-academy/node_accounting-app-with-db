'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const { uuid } = require('uuidv4');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuid,
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

const getAll = () => {
  return User.findAll();
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({
    name,
  });
};

const update = (id, name) => {
  return User.update({ name }, {
    where: { id },
  });
};

const remove = (id) => {
  return User.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
