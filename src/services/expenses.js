'use strict';

const Expense = require('../models/Expense');

const getAll = async({
  userId,
  categories,
  from,
  to,
}) => {
  let expenses = await Expense.findAll();

  expenses = expenses.filter(expense => {
    const byUserId = userId
      ? expense.userId === +userId
      : true;

    const byCategories = categories
      ? categories.includes(expense.category)
      : true;

    const byFrom = from
      ? expense.spentAt > from
      : true;

    const byTo = to
      ? expense.spentAt < to
      : true;

    return byUserId && byCategories && byFrom && byTo;
  });

  return expenses;
};

const getById = (id) => Expense.findByPk(id);

const create = (data) => Expense.create(data);

const update = (id, data) => Expense.update(data, {
  where: { id },
});

const remove = (id) => Expense.destroy({
  where: { id },
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
