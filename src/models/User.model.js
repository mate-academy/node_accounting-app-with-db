'use strict';

const _require = require('sequelize');
const DataTypes = _require.DataTypes;

const _require2 = require('../db.js');
const sequelize = _require2.sequelize;

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = {
  User: User,
};
