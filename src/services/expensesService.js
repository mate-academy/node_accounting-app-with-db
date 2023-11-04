'use strict';

const { findUser } = require('./userService');
const { Expense, Sequelize } = require('../db.js');

const convertStringToDate = (string) => new Date(string);
const getAllExpenses = async() => Expense.findAll();
const getFilteredExpenses = async(user_id, categories, from, to) => {
  const fromDate = convertStringToDate(from);
  const toDate = convertStringToDate(to);

  const checkDate = () => {
    if (from && !to) {
      return { spent_at: { [Sequelize.Op.gte]: fromDate } };
    }

    if (!from && to) {
      return { spent_at: { [Sequelize.Op.lte]: toDate } };
    }

    if (from && to) {
      return { spent_at: { [Sequelize.Op.between]: [fromDate, toDate] } };
    }

    return {};
  };

  const dateFilter = checkDate();

  return Expense.findAll({
    where: {
      user_id,
      category: Array.isArray(categories)
        ? { [Sequelize.Op.in]: categories }
        : categories,
      ...dateFilter,
    },
  });
};
const addNewExpense = async(newExpense) => Expense.create(newExpense);
const isUserIdExists = async(userId) => findUser(userId);
const getExpenseById = async(id) => Expense.findByPk(id);
const removeExpense = async(id) =>
  Expense.destroy({
    where: {
      id,
    },
  });
const patchExpense = async(updatedValues, id) =>
  Expense.update(updatedValues, {
    where: {
      id,
    },
  });

module.exports = {
  getFilteredExpenses,
  getAllExpenses,
  addNewExpense,
  isUserIdExists,
  getExpenseById,
  removeExpense,
  patchExpense,
};
