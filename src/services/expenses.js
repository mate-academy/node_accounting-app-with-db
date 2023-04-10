'use strict';

const { Op } = require('sequelize');
const { generateId } = require('../functions/generateId');
const { Expense } = require('../models/expenses');

const getAll = async() => {
  const allExpenses = await Expense.findAll();

  return allExpenses;
};

const getById = async(expenseId) => {
  return Expense.findByPk(expenseId);
};

const getByParameters = async(
  userId = null,
  categories = null,
  from = new Date(0),
  to = new Date(),
) => {
  const where = {
    spentAt: {
      [Op.between]: [from, to],
    },
  };

  if (userId) {
    where.userId = +userId;
  }

  if (categories !== null) {
    where.category = {
      [Op.in]: categories,
    };
  } else {
    where.category = {
      [Op.not]: null,
    };
  }

  const foundExpenses = await Expense.findAll({ where });

  return foundExpenses;
};

const create = (data) => {
  const id = generateId();

  return Expense.create({
    id, ...data,
  });
};

const remove = (expenseId) => {
  Expense.destroy({
    where: {
      id: expenseId,
    },
  });
};

const update = (id, data) => {
  return Expense.update({ ...data }, {
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  getByParameters,
  create,
  remove,
  update,
};
