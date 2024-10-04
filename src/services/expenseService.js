/* eslint-disable no-console */
const { Expense } = require('../models/Expense.model');

const resetExpenses = async () => {
  try {
    await Expense.destroy({
      where: {}, // Порожній об'єкт означає, що будуть видалені всі записи
      truncate: true, // Це очищує таблицю та скидає автоінкрементні значення
    });

    console.log('All expenses have been reset.');
  } catch (error) {
    console.error('Error resetting expenses:', error);
    throw error;
  }
};

const getAllExpenses = async (userId, categories, from, to) => {
  let expensesAll = await Expense.findAll();

  if (userId) {
    expensesAll = expensesAll.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expensesAll = expensesAll.filter(
      (expense) => expense.category === categories,
    );
  }

  if (from && to) {
    expensesAll = expensesAll.filter(
      (expense) =>
        new Date(from) <= new Date(expense.spentAt) &&
        new Date(to) >= new Date(expense.spentAt),
    );
  }

  return expensesAll;
};

const getExpensesById = async (id) => {
  const expensesTest = await Expense.findByPk(id);

  return expensesTest;
};

const createExpense = async (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  try {
    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    console.log('New expense create');

    return expense;
  } catch (err) {
    console.error('Error creating expense', err);
  }
};

const updateExpense = async (id, data) => {
  try {
    const [updateRowsCount] = await Expense.update(data, { where: { id } });

    if (updateRowsCount > 0) {
      const updateExpenseResult = await Expense.findByPk(+id);

      return updateExpenseResult;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Updating error', error);
    throw error;
  }
};

const removeExpense = async (id) => {
  const expenseDelete = await Expense.destroy({
    where: { id },
  });

  if (!expenseDelete) {
    console.error('Error');
  }

  return Expense.findByPk(id);
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  createExpense,
  updateExpense,
  removeExpense,
  resetExpenses,
};
