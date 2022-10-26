'use strict';

const { sequelize } = require('../utils/db');
const { Expense } = require('../models/Expense.js');

function getAll() {
  return Expense.findAll();
};

let nextExpenseId = 1;

function create({ userId, title, amount, category, note }) {
  const id = nextExpenseId++;

  return Expense.findOrCreate({
    where: { id },
    defaults: {
      userId, title, amount, category, note,
    },
  });
};

function findById(id) {
  return Expense.findByPk(id);
};

function filteredByCategory(category) {
  return Expense.findOne({ where: { category } });
}

function filteredFromTo(from, to) {
  const result = sequelize.query(`
    SELECT *
    FROM expenses
    WHERE spent_at::DATE BETWEEN $1::DATE AND $2::DATE
  `, [from, to]);

  return result.rows;
}

function update(id, { title, amount, category, note }) {
  return Expense.update({
    title, amount, category, note,
  }, {
    where: { id },
  });
};

function remove(id) {
  Expense.destroy({
    where: { id },
  });
};

module.exports.expenseService = {
  getAll,
  create,
  findById,
  update,
  remove,
  filteredByCategory,
  filteredFromTo,
};
