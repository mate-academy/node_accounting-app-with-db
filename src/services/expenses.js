'use strict';

const { Expense } = require('../models/expense');
const { createId } = require('../utils/createId');

const normalize = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const getExpenses = async(userId, categories, from, to) => {
  let filteredExpenses = await Expense.findAll();

  filteredExpenses = filteredExpenses
    .filter(expense => {
      if (!isNaN(+userId) && expense.userId !== +userId) {
        return false;
      }

      if (categories
        && categories.length
        && !(categories.includes(expense.category))) {
        return false;
      }

      if (from && Date.parse(expense.spentAt) < Date.parse(from)) {
        return false;
      }

      if (to && Date.parse(expense.spentAt) > Date.parse(to)) {
        return false;
      }

      return true;
    });

  return filteredExpenses;
};

const getExpense = (expenseId) => {
  return Expense.findByPk(+expenseId);
};

const createExpense = (expense) => {
  const id = createId(getExpenses());

  return Expense.create({
    id,
    expense,
  });
};

const deleteExpense = (expenseId) => {
  return Expense.destroy({
    where: { id: +expenseId },
  });
};

const updateExpense = ({
  expenseId,
  dataToUpdate,
}) => {
  return Expense.update(dataToUpdate, {
    where: { id: +expenseId },
    returning: true,
  });
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  normalize,
};
