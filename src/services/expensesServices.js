'use strict';

const { Sequelize } = require("sequelize");
const Expenses = require("../models/expenses");
const sequelize = require("../utils/db");


async function getAll() {
  return await Expenses.findAll();
};

async function getById(id) {
  return await Expenses.findByPk({
    where: { id },
  })
};

async function create({ userId, title, amount, category, note }) {
  const newExpenses = {
    userId,
    title,
    amount,
    category,
    note,
  };

  await Expenses.create(newExpenses);

  return await getById({
    where: newExpenses,
  });
};

async function remove(id) {
  await sequelize.transaction(() => {
    Expenses.delete({
      where: { id },
    });
  });
};

async function update(body, id) {
  return await Expenses.update(body, {
    where: { id },
  });
};

module.exports = {
  getAll, getById, create, remove, update,
};
