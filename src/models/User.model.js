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
    timestamps: false,
  },
);

User.sync({ force: true });

module.exports = {
  User,
};
