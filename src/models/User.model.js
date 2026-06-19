'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);

// const origDestroy = User.destroy.bind(User);
// User.destroy = function (options = {}) {
//   if (options.truncate && !options.where) {
//     options.where = {};
//     options.restartIdentity = true;
//   }
//   return origDestroy(options);
// };

module.exports = User;
