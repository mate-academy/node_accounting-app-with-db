/* eslint-disable no-console */
const { Expense } = require('../models/Expense.model');

// let expenses = [];
/* логіка вибору унікального ключа */
const expensesId = async () => {
  const id = await Expense.max('id');

  return id ? id + 1 : 1;
};

let idExp;

const initializeIdExp = async () => {
  idExp = await expensesId();
};

initializeIdExp();
/**/

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

const getAllExpenses = async () => {
  const expensesAll = await Expense.findAll();

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
      id: idExp,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    idExp++;

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
