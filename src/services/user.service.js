'use strict';
/* eslint-disable object-curly-newline */

const { sequelize } = require('./db');
const { generateNewId } = require('../helpers/generateNewId');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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

const getAll = () => User.findAll({ order: ['id'] });

const getById = (id) => User.findByPk(id);

const create = async(name) => {
  const users = await getAll();
  const id = generateNewId(users);

  return User.create({ id, name });
};

const update = async(id, name) => {
  const [, [updatedUser]] = await User.update({ name }, {
    where: { id },
    returning: true,
  });

  return updatedUser;
};

const remove = (id) => {
  User.destroy({
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
