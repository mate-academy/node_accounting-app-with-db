const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const initExpenses = async () => {
  try {
    Expense.sync({ force: true });
  } catch (error) {
    throw new Error();
  }
};

const getAllExpenses = async ({ userId, categories, from, to }) => {
  try {
    const whereClause = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (categories) {
      whereClause.category = categories;
    }

    if (from && to) {
      whereClause.spentAt = {
        [Op.between]: [from, to],
      };
    } else if (from) {
      whereClause.spentAt = {
        [Op.gte]: from,
      };
    } else if (to) {
      whereClause.spentAt = {
        [Op.lte]: to,
      };
    }

    const filteredExpenses = await Expense.findAll({
      where: whereClause,
    });

    return filteredExpenses;
  } catch (error) {
    throw error;
  }
};

const createExpense = async (newExpense) => {
  try {
    return await Expense.create({
      userId: newExpense.userId,
      title: newExpense.title,
      amount: newExpense.amount,
      category: newExpense.category,
      note: newExpense.note,
    });
  } catch (error) {
    throw new Error();
  }
};

const getExpenseById = async (id) => {
  try {
    return await Expense.findByPk(id);
  } catch (error) {
    throw new Error();
  }
};

const updateExpense = async (id, data) => {
  try {
    return await Expense.update(data, { where: { id } });
  } catch (error) {
    throw new Error();
  }
};

const deleteExpense = async (id) => {
  try {
    await Expense.destroy({ where: { id } });
  } catch (error) {
    throw new Error();
  }
};

module.exports = {
  initExpenses,
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
