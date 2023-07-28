'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:data@localhost/expenses');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
}, {
  tableName: 'user',
  updatedAt: false,
});

const Expenses = sequelize.define('Expenses', {
  spentAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },

  note: {
    type: DataTypes.STRING,
    allowNull: true,
    require: false,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
});

async function runDataBase() {
  try {
    await User.hasMany(Expenses, { foreignKey: 'userId' });
    await Expenses.belongsTo(User, { foreignKey: 'userId' });

    await User.sync();
    await Expenses.sync();

    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection to DB has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
}

runDataBase();

module.exports = {
  sequelize,
  User,
  Expenses,
};
