'use strict';

const { Op } = require('sequelize');
const { Expense } = require('./../models/Expense.model');

async function getAll() {
  return Expense.findAll();
}

async function getById(id) {
  return Expense.findByPk(id);
}

async function getByUserId(userId) {
  const result = await Expense.findAll({
    where: {
      userId,
    },
  });

  return result;
}

async function getByDate(from, to) {
  const result = await Expense.findAll({
    where: {
      spentAt: {
        [Op.between]: [from, to],
      },
    },
  });

  return result;
}

async function getByCategory(userId, categories) {
  const arrayCatagories = [categories];

  const result = await Expense.findAll({
    where: {
      userId,
      category: {
        [Op.in]: arrayCatagories,
      },
    },
  });

  return result;
}

async function create(expense) {
  const result = await Expense.create(expense);

  return result;
}

async function remove(id) {
  return Expense.destroy({
    where: {
      id,
    },
  });
}

async function update(id, toUpdate) {
  await Expense.update(toUpdate, {
    where: {
      id,
    },
  });
}

module.exports = {
  getAll,
  getById,
  getByUserId,
  getByDate,
  getByCategory,
  create,
  remove,
  update,
};
