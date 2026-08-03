'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db.js');

const Todo = sequelize.define(
  'Todo',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ['new', 'active', 'locked'],
      defaultValue: 'new',
    },
  },
  {
    tableName: 'todos',
  },
);

module.exports = {
  Todo,
};
