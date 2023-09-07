'use strict';

const Expenses = require('../models/expenses.js');
const sequelize = require('../utils/db.js');

async function getAll() {
  const expenses = await Expenses.findAll({
    order: [['createdAt', 'DESC']],
  });

  return expenses;
};

async function getById(id) {
  const expense = await Expenses.findByPk(id);

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
  await sequelize.transaction(async(t) => {
    Expenses.destroy({
      where: { id },
    }, { transaction: t });
  });
};

async function update(body, id) {
  await sequelize.transaction(async(t) => {
    await Expenses.update(body, {
      where: { id },
    }, { transaction: t });
  });
};

module.exports = {
  getAll, getById, create, remove, update,
};
