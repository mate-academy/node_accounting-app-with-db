'use strict';

const Expenses = require('../models/expenses');
const sequelize = require('../utils/db');

function getAll() {
  return Expenses.findAll();
};

async function getById(id) {
  const expense = await Expenses.findByPk({
    where: { id },
  });

  return expense;
};

async function create({ userId, title, amount, category, note }) {
  const newExpenses = {
    userId,
    title,
    amount,
    category,
    note,
  };

  const createExpenses = await Expenses.create(newExpenses);

  return createExpenses;
};

async function remove(id) {
  const t = await sequelize.transaction();

  try {
    Expenses.delete({
      where: { id },
    });

    t.commit();
  } catch (error) {
    t.rollback();
  }
};

async function update(body, id) {
  const updateExpense = await Expenses.update(body, {
    where: { id },
  });

  return updateExpense;
};

module.exports = {
  getAll, getById, create, remove, update,
};
