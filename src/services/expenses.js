'use strict';

const { Expense } = require('../models/expenses');

const normalize = ({ id, userId, title, amount, category, note }) => ({
  id,
  userId,
  title,
  amount,
  category,
  note,
});

const create = (data) => {
  return Expense.create({ ...data });
};

const getAll = async(userId, categories, from, to) => {
  const expenses = await Expense.findAll({
    order: ['spentAt'],
  });

  const filteredExpenses = expenses.filter((expense) => {
    const { spentAt } = expense;

    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (
      from
      && to
      && (spentAt.localeCompare(from) === -1 || spentAt.localeCompare(to) === 1)
    ) {
      return false;
    }

    if (
      categories.length
      && categories.every((category) => category !== expense.category)
    ) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

const getById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const update = (expenseId, title) => {
  return Expense.update(
    { title },
    {
      where: {
        id: expenseId,
      },
    }
  );
};

const remove = (expenseId) => {
  return Expense.destroy({
    where: {
      id: expenseId,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
};
