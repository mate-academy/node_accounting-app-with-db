'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeBulkDestroy: (options) => {
        if (options.truncate) {
          options.truncate = false;
        }
      },
    },
  },
);

module.exports = {
  User,
};
