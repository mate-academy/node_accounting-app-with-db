'use strict';

const { Expense } = require('../constants');

const getAll = async(query) => {
  const expenses = await Expense.findAll({
    where: query,
  });

  return expenses;
};

const getById = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async(data) => {
  const id = Number(new Date());

  const expense = await Expense.create({
    id,
    ...data,
  });

  return expense;
};

const update = async(
  id,
  data,
) => {
  await Expense.update(
    data,
    { where: { id } },
  );
};

const deleteExpense = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteExpense,
};
