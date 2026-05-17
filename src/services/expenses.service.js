const { Expense } = require('./../models/Expense.model');
const { Op } = require('sequelize');

const getAllExpenses = async ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (Array.isArray(categories)) {
    where.category = {
      [Op.in]: categories,
    };
  } else if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  } else if (from) {
    where.spentAt = {
      [Op.gt]: from,
    };
  } else if (to) {
    where.spentAt = {
      [Op.lt]: to,
    };
  }

  const result = await Expense.findAll({ where });

  return result;
};

const getExpenseById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const createExpense = async (data) => {
  const result = await Expense.create(data);

  return result;
};

const updateData = async (id, data) => {
  const [affectedRows, [updatedUser]] = await Expense.update(data, {
    where: { id: +id },
    returning: true,
  });

  return affectedRows > 0 ? updatedUser : null;
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  remove,
  updateData,
  createExpense,
};
