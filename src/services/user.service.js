'use strict';

const { DataTypes } = require('sequelize');

const { sequelize } = require('./db.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  const result = await User.findAll({
    order: ['id'],
  });

  return result;
};

const create = (name) => {
  return User.create({ name });
};

const getById = (id) => {
  return User.findByPk(id);
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const update = async({ id, name }) => {
  await User.update({ name }, { where: { id } });

  const updatedUser = {
    id,
    name,
  };

  return updatedUser;
};

module.exports = {
  userService: {
    getAll,
    create,
    getById,
    remove,
    update,
    User,
  },
};
