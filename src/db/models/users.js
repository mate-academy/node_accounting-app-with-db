'use strict';

const { sequelize } = require('../main');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

module.exports = { Users };
