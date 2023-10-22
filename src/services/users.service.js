'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users_board',
  updatedAt: false,
  createdAt: false,
});

User.sync({ force: true });

const getAll = async() => {
  const users = await User.findAll({
    order: ['id'],
  });

  return users;
};

const getById = async(id) => User.findByPk(id);

const add = (user) => User.create(user);

const updateById = async(id, name) => User.update({ name }, { where: { id } });

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
  add,
  updateById,
  remove,
};
