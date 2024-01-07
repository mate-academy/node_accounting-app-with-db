'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('./../database');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

const getAllExpenses = async() => {
  const result = await Expense.findAll();

  return result;
};

const getExpenseById = (id) => Expense.findByPk(id);

const addNewExpense = async(expense) => {
  const lastExpense = await Expense.findOne({
    attributes: ['id'],
    order: [['id', 'DESC']],
  });

  const getNewExpenseId = lastExpense ? lastExpense.id + 1 : 0;

  const newExpense = {
    ...expense,
    id: getNewExpenseId,
  };

  Expense.create(newExpense);
};

const removeExpense = (id) => {
  Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = async(id, title) => {
  await Expense.update({
    title,
  }, {
    where: { id },
  });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  removeExpense,
  updateExpense,
};
