'use strict';

const { Expense } = require('../database/expensesDb');

const normalize = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
});

const getExpenses = async(idOfUser, from, to, categories) => {
  const expenses = await Expense.findAll();

  return expenses.reduce((acc, expense) => {
    const { userId, spentAt, category } = expense;

    const condition1 = idOfUser
      ? idOfUser === userId
      : true;

    const condition2 = from
      ? new Date(from).getTime() < new Date(spentAt).getTime()
      : true;

    const condition3 = to
      ? new Date(to).getTime() > new Date(spentAt).getTime()
      : true;

    const condition4 = categories
      ? categories.includes(category)
      : true;

    const mainCondition = condition1 && condition2 && condition3 && condition4;

    if (mainCondition) {
      return [...acc, normalize(expense)];
    } else {
      return acc;
    }
  }, []);
};

const createExpenses = async(expense) => {
  const createdExpense = await Expense.create(expense);

  return createdExpense;
};

const getExpense = async(expenseId) => {
  const foundExpense = await Expense.findByPk(expenseId);

  return normalize(foundExpense);
};

const resetExpenses = () => {
  Expense.sync({ force: true });
};

const deleteExpense = async(expenseId) => {
  const wasTheExpenseDeleted = await Expense.destroy({
    where: {
      id: expenseId,
    },
  });

  if (!wasTheExpenseDeleted) {
    throw new Error('can\'t find an expense');
  }
};

const updateExpense = async(expenseId, dataToUpdate) => {
  const wasTheExpenseUpdated = await Expense.update(dataToUpdate, {
    where: {
      id: expenseId,
    },
  });

  if (!wasTheExpenseUpdated[0]) {
    throw new Error('can\'t find an expense');
  }
};

module.exports = {
  resetExpenses,
  getExpenses,
  createExpenses,
  getExpense,
  deleteExpense,
  updateExpense,
};
