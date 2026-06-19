'use strict';

const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    name: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = {
  User,
};
