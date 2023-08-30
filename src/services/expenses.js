'use strict';

const { getUser } = require('./users.js');
const { v4: uuid } = require('uuid');

const { Op } = require('sequelize');
const Expense = require('../models/Expense.js');

function filterExpenses(expenses, {
  selectedUserId,
  categories,
  from,
  to,
}) {
  let expensesCopy = [...expenses];

  if (selectedUserId) {
    expensesCopy = expensesCopy
      .filter(({ userId }) => userId === selectedUserId);
  }

  if (categories && categories.length) {
    expensesCopy = expensesCopy
      .filter(({ category }) => categories.includes(category));
  }

  if (from) {
    const timeFrom = new Date(from).getTime();

    expensesCopy = expensesCopy
      .filter(({ spentAt }) => {
        return new Date(spentAt).getTime() >= timeFrom;
      });
  }

  if (to) {
    const timeTo = new Date(to).getTime();

    expensesCopy = expensesCopy
      .filter(({ spentAt }) => new Date(spentAt).getTime() < timeTo);
  }

  return expensesCopy;
}

async function isDataInvalid({ userId, spentAt, title, amount, category }) {
  const user = await getUser(userId);

  return !user || !spentAt || !title
    || typeof amount !== 'number' || !category;
}

async function findAll(params) {
  const searchParams = {};

  if (params.userId) {
    searchParams.userId = {
      [Op.eq]: params.userId,
    };
  };

  if (params.category) {
    searchParams.category = {
      [Op.in]: params.category,
    };
  }

  if (params.from) {
    searchParams.spentAt = {
      [Op.gte]: params.from,
    };
  }

  if (params.to) {
    searchParams.spentAt = {
      ...searchParams.spentAt,
      [Op.lt]: params.to,
    };
  }

  const expenses = await Expense.findAll({
    where: searchParams,
    attributes: ['userId', 'spentAt', 'title', 'amount', 'category', 'note'],
    order: [
      ['spent_at', 'ASC'],
    ],
  });

  return expenses.map(expense => expense.dataValues);
}

async function getAll() {
  const expenses = await Expense.findAll({
    attributes: ['userId', 'spentAt', 'title', 'amount', 'category', 'note'],
    order: [
      ['spent_at', 'ASC'],
    ],
  });

  return expenses.map(expense => expense.dataValues);
}

async function getExpense(expenseId) {
  const expense = await Expense.findOne({
    attributes: ['userId', 'spent_at', 'title', 'amount', 'category', 'note'],
    where: {
      id: expenseId,
    },
  });

  return expense.dataValues;
}

async function addExpense(data) {
  const id = uuid();

  const newExpense = await Expense.create({
    id,
    ...data,
  });

  return newExpense.dataValues;
}

async function updateExpense(expenseId, data) {
  await Expense.update(data, {
    where: {
      id: expenseId,
    },
  });

  return getExpense(expenseId);
}

async function removeExpense(expenseId) {
  await Expense.destroy({
    where: {
      id: expenseId,
    },
  });
}

module.exports = {
  filterExpenses,
  isDataInvalid,
  getAll,
  getExpense,
  updateExpense,
  removeExpense,
  addExpense,
  findAll,
};
