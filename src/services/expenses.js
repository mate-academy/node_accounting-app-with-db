'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/expenses');
const { Category } = require('../models/categories');
const { normalizeExpense } = require('../helpers');

async function getAll({
  userId,
  categories,
  from,
  to,
}) {
  const expenses = await Expense.findAll({
    where: {
      userId,
      createdAt: {
        [Op.between]: [from, to],
      },
    },
    include: [{
      model: Category,
      where: {
        id: {
          [Op.in]: categories,
        },
      },
    }],
    order: ['userId', 'createdAt'],
  });

  return expenses.map(normalizeExpense);
}

async function getById(id) {
  const expense = await Expense.findByPk(id);

  return normalizeExpense(expense);
}

async function create(expense) {
  const newExpense = await Expense.create(expense);

  return normalizeExpense(newExpense);
}

async function removeById(id) {
  await Expense.destroy({
    where: {
      id,
    },
  });
}

async function update(id, partsToUpdate) {
  const updatedExpense = await Expense.update(partsToUpdate, {
    where: {
      id,
    },
  });

  return normalizeExpense(updatedExpense);
}

module.exports = {
  expensesService: {
    getAll,
    getById,
    create,
    removeById,
    update,
  },
};
