'use strict';
/*eslint-disable*/

var _require = require('sequelize'),
  DataTypes = _require.DataTypes;

var _require2 = require('../db.js'),
  sequelize = _require2.sequelize;

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
