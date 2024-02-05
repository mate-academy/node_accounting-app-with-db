'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');

const getAllExpenses = async({ userId, categories, from, to }) => {
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

  const result = await Expense.findAll({ where });

  return result;
};

const getExpensesById = async(id) => {
  return Expense.findByPk(id);
};

const createExpense = async(data) => {
  const result = await Expense.create({
    ...data,
  }, { returning: ['id', 'userId', 'spentAt', 'title', 'amount'] });

  return result;
};

const deleteExpenses = async(id) => {
  const result = await Expense.destroy({
    where: { id },
  });

  if (result !== 1) {
    throw new Error('Id not found');
  }
};

const editExpense = async(title, id) => {
  const [ status, updatedResult ] = await Expense.update({ title }, {
    where: { id }, returning: true,
  });

  if (status !== 1) {
    throw new Error('Id not found');
  }

  return updatedResult[0];
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  createExpense,
  deleteExpenses,
  editExpense,
};
