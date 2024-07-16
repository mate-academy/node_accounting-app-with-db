const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAllExpenses = async () => {
  return Expense.findAll();
};

const getExpensesByFilter = async (filters) => {
  return Expense.findAll({
    where: {
      [Op.and]: filters,
    },
  });
};

const getExpenseById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const createExpense = async (requestBody) => {
  const { userId, spentAt, title, amount, category, note } = requestBody;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined
  ) {
    throw new Error('Invalid Expense data');
  }

  const newExpense = await Expense.create({
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  });

  return newExpense;
};

const deleteExpenseById = async (expenseId) => {
  await Expense.destroy({
    where: {
      id: expenseId,
    },
  });
};

const updateExpense = async (expenseId, newExpenseData) => {
  if (!(await getExpenseById(expenseId))) {
    throw new Error(404);
  }

  const dataToUpdate = newExpenseData;

  dataToUpdate.userId = +dataToUpdate.userId;
  dataToUpdate.amount = +dataToUpdate.amount;

  const newData = {};

  for (const key in dataToUpdate) {
    if (!dataToUpdate[key]) {
      continue;
    }

    newData[key] = dataToUpdate[key];
  }

  return Expense.update(newData, {
    where: {
      id: expenseId,
    },
    returning: true,
  });
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpensesByFilter,
  getExpenseById,
  deleteExpenseById,
  updateExpense,
};
