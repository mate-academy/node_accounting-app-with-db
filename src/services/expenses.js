'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expenses');

async function getAll(getQuery) {
  const { userId, category, from, to } = getQuery;

  return Expense.findAll({
    where: {
      [Op.and]: [
        userId && { userId },
        category && { category },
        to && { spentAt: { [Op.lte]: to } },
        from && { spentAt: { [Op.gte]: from } },
      ],
    },
    order: [
      'id',
    ],
  });
}

function getById(expenseId) {
  return Expense.findByPk(expenseId);
}

function addNew({ userId, title, amount, category, note }) {
  return Expense.create({
    userId,
    title,
    amount,
    category,
    note,
  });
}

function remove(expensesId) {
  return Expense.destroy({ where: { id: expensesId } });
}

function change(expensesId, newParams) {
  return Expense.update(
    { ...newParams },
    {
      where: {
        id: expensesId,
      },
    }
  );
}

module.exports = {
  getAll,
  getById,
  addNew,
  remove,
  change,
};
