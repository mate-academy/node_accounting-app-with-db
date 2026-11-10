'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const get = async({ userId, categories, from, to }) => {
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
        [Op.between]: [new Date(from), new Date(to)],
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

const getById = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async(fields) => {
  const newExpense = await Expense.create({ ...fields });

  return newExpense;
};

const update = async(id, fields) => {
  return Expense.update({ ...fields }, {
    where: {
      id,
    },
  });
};

const remove = async(id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
