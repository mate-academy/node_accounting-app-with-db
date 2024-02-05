'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async() => Expense.findAll({ order: ['id'] });

const getExpenses = async({
  userId,
  categories,
  from,
  to,
}) => {
  const whereConditions = {};

  if (userId) {
    whereConditions.userId = userId;
  }

  if (categories) {
    whereConditions.category = categories;
  }

  if (from && to) {
    whereConditions.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  const expenses = await Expense.findAll({
    where: whereConditions,
  });

  return expenses;
};

const createExpense = async({
  userId,
  title,
  spentAt,
  category,
  amount,
  note = '',
}) => {
  await Expense.create({
    userId,
    title,
    spentAt,
    category,
    amount,
    note,
  });
};

const getExpense = (id) => {
  return Expense.findByPk(id);
};

const deleteExpense = async(id) => {
  await Expense.destroy({ where: { id } });
};

const updateExpense = async({
  id,
  title,
  spentAt,
  category,
  amount,
  note = '',
}) => {
  await Expense.update({
    title,
    spentAt,
    category,
    amount,
    note,
  }, { where: { id } });
};

module.exports = {
  getAll,
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
