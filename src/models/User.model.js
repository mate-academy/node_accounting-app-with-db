'use strict';

const { sequelize, DataTypes } = require('../db.js');

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
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = {
  User,
};
