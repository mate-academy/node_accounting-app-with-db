// In User.model.js
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
    timestamps: false,
  },
);

// Override the standard destroy method to handle truncation with CASCADE
const originalDestroy = User.destroy;

User.destroy = async function (options) {
  if (options && options.truncate === true) {
    // Use raw query to truncate with CASCADE
    return sequelize.query('TRUNCATE TABLE "Users" CASCADE');
  }

  return originalDestroy.call(this, options);
};

module.exports = {
  User,
};
