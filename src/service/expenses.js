'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense');

const getAll = ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: [categories] };
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  return Expense.findAll({
    where,
    order: ['id'],
  });
};

const getById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const add = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expense.create({ newExpense });
};

const remove = (expenseId) => {
  return Expense.destroy({
    where: { id: expenseId },
  });
};

const update = (id, updatedData) => {
  return Expense.update({ ...updatedData }, {
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
