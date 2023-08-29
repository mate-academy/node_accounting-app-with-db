'use strict';

const { Op } = require('sequelize');
const Expense = require('../models/expenses.js');

const getAll = async({ userId, categories, from, to }) => {
  const query = {};

  if (userId) {
    query.userId = userId;
  }

  if (categories) {
    query.category = categories;
  }

  if (from && to) {
    query.spentAt = {
      [Op.between]: [from, to],
    };
  }

  const expenses = await Expense.findAll({
    where: query,
  });

  return expenses;
};

const getOne = async(expenseId) => {
  const expense = await Expense.findByPk(expenseId);

  return expense;
};

const create = async({ userId, spentAt, title, amount, categoryId, note }) => {
  const newExpence = {
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  };

  const expenseToPush = await Expense.create(newExpence);

  return expenseToPush;
};

const deleteOne = async(expenseId) => {
  const expenseToRemove = await Expense.destroy({
    where: { id: expenseId },
  });

  return expenseToRemove;
};

const updateOne = async(expenseId, body) => {
  const expenseToUpdate = await Expense.update(body, {
    where: { id: expenseId },
  });

  return expenseToUpdate;
};

module.exports = {
  getAll, getOne, create, deleteOne, updateOne,
};
