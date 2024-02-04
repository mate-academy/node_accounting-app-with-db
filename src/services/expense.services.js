/* eslint-disable no-console */
'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/expense.model');

const getAllExpenses = async(req) => {
  const { userId, categories, from, to } = req.query;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  const expense = await Expense.findAll({ where });

  return expense;
};

const getExpenseById = async(id) => {
  const expense = await Expense.findByPk(+id);

  return expense;
};

const createExpense = async(expense) => {
  const newExpense = await Expense.create(expense);

  return newExpense;
};

const updateExpense = async(id, expense) => {
  const [ , updatedRows ] = await Expense.update(expense, {
    where: { id: +id },
    returning: true,
  });

  return updatedRows[0];
};

const deleteExpense = async(id) => {
  const deletedExpense = await Expense.destroy({ where: { id: +id } });

  return deletedExpense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
