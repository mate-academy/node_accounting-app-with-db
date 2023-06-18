'use strict';

const { sequelize } = require('../database/db');
const { Expenses } = require('../models/Expenses');
const { Op, QueryTypes } = require('sequelize');

function normalize({ id, userId, spentAt, title, amount, category, note }) {
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

const getMax = (array) => {
  if (array.length === 0) {
    return 0;
  }

  return Math.max(...array.map(({ id }) => id)) + 1;
};

async function getAll({ userId, categories, from, to }) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.categories = {
      [Op.in]: categories,
    };
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expenses.findAll({ where });
}

function getById(expenseId) {
  return Expenses.findByPk(expenseId);
}

async function create(data) {
  const expenses = await getAll({});
  const id = getMax(expenses);

  return Expenses.create({
    id,
    ...data,
  });
}

function remove(expenseId) {
  return Expenses.destroy({
    where: { id: expenseId },
  });
}

function removeMany(ids) {
  return sequelize.query(
    `DELETE FROM expenses
    WHERE id IN (?)`,
    {
      replacements: [ids],
      type: QueryTypes.BULKDELETE,
    },
  );
}

function update({ id, ...body }) {
  return Expenses.update({ ...body }, {
    where: { id },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeMany,
  normalize,
};
