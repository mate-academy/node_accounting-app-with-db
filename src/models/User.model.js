'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
}
);

const normalize = ({ id, name }) => {
  return {
    id, name,
  };
};

module.exports = {
  User,
  normalize,
};
