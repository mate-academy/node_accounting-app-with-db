"use strict";

const { sequelize } = require('../controllers/db')
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'users',
});

 async function getAll() {
  return await User.findAll({
    order: ['createdAt']
  });
}

async function getById(id) {
  return await User.findByPk(id);
}

async function createUser(name) {
    return await User.create({ name });
  }


 async function updateUser(name, id) {
  return await User.update({ name }, {
    where: { id },
  })
}

async function removeUser(id) {
  return await User.destroy({
    where: { id },
  })
}

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  User,
  removeUser,
};
