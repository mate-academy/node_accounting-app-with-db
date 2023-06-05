'use strict';

const { filterExpanses } = require('../utils/filterExpanses.js');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db.js');
const { UserModel } = require('./users.js');

const ExpenseModel = sequelize.define('ExpenseModel', {
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
      model: UserModel,
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

ExpenseModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'id',
});

UserModel.hasMany(ExpenseModel, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

function getExpenses(queryParams) {
  const whereConditions = filterExpanses(queryParams);

  return ExpenseModel.findAll({
    where: whereConditions,
  });
}

function getExpenseById(expensesId) {
  return ExpenseModel.findByPk(expensesId);
}

function createExpense(data) {
  return ExpenseModel.create({ ...data });
}

function removeExpense(expensesId) {
  return ExpenseModel.destroy({
    where: { id: expensesId },
  });
}

function updateExpense({ expensesId, data }) {
  return ExpenseModel.update({ ...data }, {
    where: { id: expensesId },
  });
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  ExpenseModel,
};
