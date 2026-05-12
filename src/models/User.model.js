const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Users',
    timestamps: false,
  },
);

const model = {
  getUsers() {
    return User.findAll();
  },
  getUser(id) {
    return User.findByPk(id);
  },
  createUser(name) {
    return User.create({ name });
  },
  deleteUser(id) {
    return User.destroy({ where: { id } });
  },
  async updateUser(id, name) {
    const [updatedCount] = await User.update({ name }, { where: { id } });

    if (updatedCount === 0) {
      return null;
    }

    return User.findByPk(id);
  },
};

module.exports = {
  User,
  model,
};
