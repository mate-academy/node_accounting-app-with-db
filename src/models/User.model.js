/* eslint-disable no-console */
'use strict';

const { DataTypes, Model } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require('../services/database.service.js');

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);

module.exports = User;
