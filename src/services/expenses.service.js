const { Expense } = require('../models/Expense.model');

const getAll = async (queries) => {
  const { userId, categories, from, to } = queries;
  const numberUserId = +userId;

  let expenses = await Expense.findAll();

  if (userId) {
    expenses = expenses.filter((e) => e.userId === numberUserId);
  }

  if (categories) {
    expenses = expenses.filter(
      (e) => e.category.toLowerCase() === categories.toLowerCase(),
    );
  }

  if (from) {
    expenses = expenses.filter(({ spentAt }) => {
      const expenseDate = new Date(spentAt);
      const fromDate = new Date(from);

      return expenseDate >= fromDate;
    });
  }

  if (to) {
    expenses = expenses.filter(({ spentAt }) => {
      const expenseDate = new Date(spentAt);
      const toDate = new Date(to);

      return expenseDate <= toDate;
    });
  }

  return expenses;
};

const create = async (dataToCreate) => {
  const expense = await Expense.create({
    ...dataToCreate,
  });

  return expense;
};

const getById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const deleteById = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = async (dataToUpdate) => {
  const { id, ...keysToUpdate } = dataToUpdate;

  const [affectedCount, affectedRows] = await Expense.update(keysToUpdate, {
    where: { id },
    returning: true,
  });

  if (affectedCount === 0) {
    throw new Error('Something went wrong while updating the expense');
  }

  const updatedExpense = affectedRows[0];

  return updatedExpense;
};

const expensesService = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};

module.exports = {
  expensesService,
};
