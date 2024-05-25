const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'user',
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
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
  },
);

function normalize({ id, name }) {
  return { id, name };
}

function getAllUsers() {
  return User.findAll();
}

function createNewUser(name) {
  return User.create({ name });
}

function getUserById(id) {
  return User.findByPk(id);
}

function deleteUser(id) {
  return User.destroy({ where: { id } });
}

async function updateUser(id, data) {
  await sequelize.transaction(async (t) => {
    await User.update(data, { where: { id } }, { transaction: t });
  });

  return User.findByPk(id);
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUser,
  updateUser,
  normalize,
  User,
};
