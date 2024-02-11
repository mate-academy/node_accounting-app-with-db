'use strict';

const { Op } = require('sequelize');
// const { sequelize } = require('../db');
const { models: { Expense: Expenses } } = require('../models/models');

/**
 * @typedef {object} Expense
 * @property {number} id
 * @property {number} userId
 * @property {string} spentAt
 * @property {string} title
 * @property {number} amount
 * @property {string} category
 * @property {string} note
 */

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  updateById,
  updateManyById,
  removeById,
  removeManyById,
  removeAll,
  findMatchProps,
};

function normalize({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) { // DTO(data transfer object)
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

/** @param {{userId:number, categories:string[], from:string, to:string}} */
function getAll({
  userId,
  categories,
  from,
  to,
}) {
  /** @type {Expense} */
  const where = {};

  if (Number.isInteger(userId)) {
    where.userId = userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  return Expenses.findAll({ where });
}

/** @type {number} id */
function getById(id) {
  return Expenses.findByPk(id);
}

/** @param {Expense} newExpense */
function create(newExpense) {
  return Expenses.create({ ...newExpense });
}

/** @param {Expense} expenseSource */
function updateById(expenseSource, transaction,
) {
  const { id, ...restProps } = expenseSource;

  return Expenses.update({
    ...restProps,
  }, {
    where: { id },
    returning: true,
    transaction,
  });
}

/** @param {Expense[]} expensesSource */
function updateManyById(expensesSource) {
  return sequelize.transaction(async (t) => { // eslint-disable-line
    const results = [];

    for (const expense of expensesSource) {
      results.push(await updateById(expense, t));
    }

    return results;
  });
}

/** @param {number} id */
function removeById(id) {
  return Expenses.destroy({
    where: { id },
  });
}

/** @param {number[]} ids */
function removeManyById(ids) {
  return Expenses.destroy({
    where: {
      id: { [Op.in]: ids },
    },
  });
}

async function removeAll() {
  await Expenses.sync({ force: true });
}

/**
 * @param {object} targetObj
 * @param {object} sourceObj */
function findMatchProps(targetObj, sourceObj) {
  /** @type {Expense} */
  const result = {};

  for (const [targetKey, targetValue] of Object.entries(targetObj)) {
    if (!(targetKey in sourceObj)
      || typeof targetValue !== typeof sourceObj[targetKey]) {
      continue;
    }

    result[targetKey] = sourceObj[targetKey];
  }

  return Object.keys(result).length ? result : null;
}
