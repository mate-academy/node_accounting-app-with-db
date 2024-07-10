const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAll = async (userId, categories, from, to) => {
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

const getOneExpense = async (id) => {
  const result = await Expense.findByPk(+id);

  return result;
};

const deletingExpense = async (id) => {
  const result = await Expense.destroy({
    where: {
      id: +id,
    },
  });

  return result === 1;
};

const updateExpense = async (id, expData) => {
  try {
    const [affectedRows, [updatedUser]] = await Expense.update(expData, {
      where: { id: +id },
      returning: true,
    });

    return affectedRows > 0 ? updatedUser : null;
  } catch (err) {
    throw new Error('Failed to update expense');
  }
};

const createExpense = async (expData) => {
  const result = await Expense.create(expData);

  return result;
};

module.exports = {
  getAll,
  getOneExpense,
  deletingExpense,
  updateExpense,
  createExpense,
};
