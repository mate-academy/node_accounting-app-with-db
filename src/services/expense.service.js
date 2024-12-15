const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');

const getExpenses = async ({ userId, categoryList, from, to }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categoryList && categoryList.length > 0) {
    whereClause.category = { [Op.in]: categoryList };
  }

  if (from) {
    whereClause.spentAt = { [Op.gte]: new Date(from) };
  }

  if (to) {
    whereClause.spentAt = { ...whereClause.spentAt, [Op.lte]: new Date(to) };
  }

  const expenses = await Expense.findAll({
    where: whereClause,
  });

  return expenses;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category = '',
  note = '',
}) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const updateExpense = async ({ id, data }) => {
  const [numberOfAffectedRows] = await Expense.update(data, { where: { id } });

  if (numberOfAffectedRows === 0) {
    return null;
  }

  const updatedExpense = await getExpenseById(id);

  return updatedExpense;
};

const deleteExpense = async (id) => {
  const deletedExpense = await Expense.destroy({ where: { id } });

  return deletedExpense;
};

const expenseService = {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};

module.exports = {
  expenseService,
};
