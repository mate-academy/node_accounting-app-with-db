'use strict';

const Expense = require('../models/Expense');
const { Op } = require('sequelize');

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
    order: [
      'id',
    ],
  });
};

const getById = (expenseId) => Expense.findByPk(expenseId);

const create = (expenseData) => Expense.create({ ...expenseData });

const remove = (expenseId) => Expense.destroy({ where: { id: expenseId } });

const update = (expenseId, data) => {
  return Expense.update(
    { ...data },
    { where: { id: expenseId } },
  );
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
