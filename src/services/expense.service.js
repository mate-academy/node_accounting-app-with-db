const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model.js');

const isValidDate = (date) => {
  const parsedDate = new Date(date);

  return !isNaN(parsedDate.getTime());
};

const getExpenses = async ({ userId, categoryList, from, to }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categoryList && categoryList.length > 0) {
    whereClause.category = { [Op.in]: categoryList };
  }

  if (from) {
    if (!isValidDate(from)) {
      throw new Error("'from' parameter is not a valid date.");
    }
    whereClause.spentAt = { [Op.gte]: new Date(from) };
  }

  if (to) {
    if (!isValidDate(to)) {
      throw new Error("'to' parameter is not a valid date.");
    }

    whereClause.spentAt = {
      ...whereClause.spentAt,
      [Op.lte]: new Date(to),
    };
  }

  const expenses = await Expense.findAll({
    where: whereClause,
  });

  return expenses;
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category = '',
  note = '',
}) => {
  if (!isValidDate(spentAt)) {
    throw new Error("'spentAt' must be a valid date.");
  }

  return Expense.create({
    userId,
    spentAt: new Date(spentAt),
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
  const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];
  const invalidFields = Object.keys(data).filter(
    (key) => !allowedFields.includes(key),
  );

  if (invalidFields.length > 0) {
    throw new Error(
      `Invalid fields in update data: ${invalidFields.join(', ')}.`,
    );
  }

  if (data.spentAt && !isValidDate(data.spentAt)) {
    throw new Error("'spentAt' must be a valid date.");
  }

  if (
    data.amount !== undefined &&
    (typeof data.amount !== 'number' || data.amount <= 0)
  ) {
    throw new Error("'amount' must be a positive number.");
  }

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
