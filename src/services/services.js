const {
  models: { User, Expense },
} = require('../models/models');

const createExpenseObject = async ({
  userId,
  category,
  amount,
  spentAt,
  note,
  title,
}) => {
  const expense = await Expense.create({
    userId,
    category,
    amount,
    spentAt: spentAt || new Date(),
    note,
    title,
  });

  return expense;
};

const checkExpense = (userId, from, to, categories, expenses) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.userId === Number(userId),
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) <= new Date(to),
    );
  }

  if (categories) {
    const categoryList = categories.split(',');

    filteredExpenses = filteredExpenses.filter((e) => {
      return categoryList.includes(e.category);
    });
  }

  return filteredExpenses;
};

const createUserObject = async (name) => {
  const user = await User.create({ name });

  return user;
};

module.exports = {
  createUserObject,
  checkExpense,
  createExpenseObject,
};
