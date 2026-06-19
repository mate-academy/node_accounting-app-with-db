'use strict';

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../db.js');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Users',
      timestamps: false,
    },
  );

  return User;
};
