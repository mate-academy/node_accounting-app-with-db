'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const { User } = require('./users.js');
const { filterExpenses } = require('../utils/filterExpenses.js');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNul: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'spentAt',
    allowNul: false,
    defaultValue: DataTypes.NOW,
  },
  title: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNul: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNul: true,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
});

Expense.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
});

User.hasMany(Expense, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

function getExpenses(queryParams) {
  const conditions = filterExpenses(queryParams);

  return Expense.findAll({
    where: conditions,
  });
}

function getById(expenseId) {
  return Expense.findByPk(expenseId);
}

function addExpense(data) {
  return Expense.create({ ...data });
}

function remove(expenseId) {
  return Expense.destroy({
    where: { expenseId },
  });
}

function update({ id, body }) {
  return Expense.update({ ...body }, {
    where: { id },
  });
}

module.exports = {
  getExpenses,
  getById,
  addExpense,
  remove,
  update,
};
