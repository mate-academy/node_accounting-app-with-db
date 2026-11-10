'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

// Безпечний патч для очищення бази в тестах.
// Додає CASCADE при TRUNCATE, обходячи внутрішній баг Sequelize з хуками.
const originalDestroy = User.destroy.bind(User);

User.destroy = async function (options) {
  if (options && options.truncate) {
    options.cascade = true;
  }

  return originalDestroy(options);
};

module.exports = { User };
