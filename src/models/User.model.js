'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER, // число
      primaryKey: true, // ключ
      autoIncrement: true, // автоинкремент
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   field: 'created_at',
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  },
);

module.exports = {
  User,
};
