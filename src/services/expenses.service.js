'use strict';

const { Expense } = require('../models/models').models;

const getOne = async(id) => Expense.findByPk(id);
const getAll = async() => Expense.findAll();
const remove = async(id) => Expense.destroy({ where: { id } });

const create = async(
  userId,
  spentAt,
  title,
  amount,
  category = 'uncategorized',
  note = null,
) => {
  const expense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
};

const update = async(id, args) => {
  return Expense.update({ ...args }, {
    where: { id },
    returning: true,
    plain: true,
  });
};

const filter = async(id, categories, dateFrom, dateTo) => {
  const expenses = await getAll();
  const filteredExpenses = expenses.filter((item) => {
    if (!Number.isNaN(id) && item.userId !== id) {
      return false;
    }

    if (categories && !categories.includes(item.category)) {
      return false;
    }

    if (dateFrom && new Date(item.spentAt) < new Date(dateFrom)) {
      return false;
    }

    if (dateTo && new Date(item.spentAt) > new Date(dateTo)) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

module.exports = {
  getOne,
  getAll,
  remove,
  create,
  update,
  filter,
};
