const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');

const getAllExpenseService = async ({ userId, from, to, categories }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  if (categories) {
    whereClause.category = {
      [Op.in]: categories.split(','),
    };
  }

  return Expense.findAll({ where: whereClause });
};

const getExpenseByIdService = async (id) => {
  return Expense.findByPk(id);
};

const createExpenseService = async (data) => {
  if (!data) {
    throw new Error('Invalid input data');
  }

  const newExpense = await Expense.create(data);

  return newExpense;
};

const updateExpenseService = async (id, title) => {
  const expense = await getExpenseByIdService(id);

  if (!expense) {
    throw new Error('Expense not found');
  }

  expense.title = title;
  await expense.save();

  return expense;
};

const deleteExpenseService = async (id) => {
  const deletedRows = await Expense.destroy({
    where: { id },
  });

  if (deletedRows === 0) {
    throw new Error('Expense not found');
  }
};

module.exports = {
  getAllExpenseService,
  getExpenseByIdService,
  createExpenseService,
  updateExpenseService,
  deleteExpenseService,
};
