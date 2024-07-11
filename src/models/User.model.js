/* eslint-disable no-console */
'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  },
);

User.sync()
  .then(() => {
    console.log('User table has been created.');
  })
  .catch((err) => {
    console.error('Error creating User table:', err);
  });

module.exports = {
  User,
};
