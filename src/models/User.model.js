'use strict';

const { DataTypes } = require('sequelize'); // Додаємо імпорт типів даних
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Робить поле обов'язковим
    },
  },
  {
    tableName: 'users', // Явно вказуємо назву таблиці в базі (у множині)
    timestamps: false,
  },
);

module.exports = {
  User,
};
