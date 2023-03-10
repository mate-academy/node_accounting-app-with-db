'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../main');

const Users = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

module.exports = {
  Users,
};
