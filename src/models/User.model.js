'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

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
    hooks: {
      beforeBulkDestroy: async () => {
        if (sequelize.models.Expense) {
          await sequelize.models.Expense.destroy({
            truncate: { cascade: true },
            force: true,
          });
        }
      },
    },
  },
);

module.exports = {
  User,
};
