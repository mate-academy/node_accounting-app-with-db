'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/expenseModel');

const getAll = ({ userId, categories, from, to }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    if (Array.isArray(categories) && categories.length > 0) {
      whereClause.category = {
        [Op.in]: categories,
      };
    } else {
      whereClause.category = categories;
    }
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  } else if (from) {
    whereClause.spentAt = {
      [Op.gte]: new Date(from),
    };
  } else if (to) {
    whereClause.spentAt = {
      [Op.lte]: new Date(to),
    };
  }

  return Expense.findAll({ where: whereClause });
};

const createExpense = (newExpense) => {
  return Expense.create(newExpense, {});
};

const getOne = (id) => {
  return Expense.findByPk(id);
};

const deleteOne = (id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};

const updateOne = async (id, updatedExpense) => {
  return Expense.update(updatedExpense, {
    where: {
      id,
    },
    returning: true,
  });
};

module.exports = {
  getAll,
  createExpense,
  getOne,
  deleteOne,
  updateOne,
};
