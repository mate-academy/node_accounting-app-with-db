'use strict';

const { Sequelize } = require('sequelize');
const { sequelize } = require('../services/db');

const User = sequelize.define('User', {
  name: Sequelize.STRING,
}, {
  updatedAt: false,
  createdAt: false,
});

module.exports = {
  User,
};
