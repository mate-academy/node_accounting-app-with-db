const {
  models: { Expense },
} = require('../models/models');

const getAll = async () => {
  const expenses = await Expense.findAll();

  return expenses;
};

const getOne = async (id) => {
  const expenseById = await Expense.findByPk(id);

  return expenseById;
};

const create = async (expensesData) => {
  const createdUser = Expense.create(expensesData);

  return createdUser;
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = async (id, updatedData) => {
  const expense = await expensesService.getOne(id);

  if (!expense) {
    return;
  }

  await Expense.update(updatedData, { where: { id } });

  const updatedExpense = await expensesService.getOne(id);

  return updatedExpense;
};

const expensesService = {
  getAll,
  getOne,
  create,
  remove,
  update,
};

module.exports = { expensesService };
