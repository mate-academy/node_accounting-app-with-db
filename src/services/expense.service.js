'use strict';

const { Expense } = require('../db/models/expense.model');

const expenseService = {
  getAll: (query) => Expense.findAll({
    order: ['id'],
    where: query,
  }),
  getById: (id) => Expense.findByPk(id),
  create: (fields) => Expense.create(fields),
  delete: (id) => Expense.destroy({ where: { id } }),

  update: (id, fields) =>
    Expense.update(fields, {
      where: { id },
      returning: true,
    }),

  normalize: ({ id, userId, spentAt, title, amount, category, note }) => ({
    id, userId, spentAt, title, amount, category, note,
  }),
};

module.exports = expenseService;
