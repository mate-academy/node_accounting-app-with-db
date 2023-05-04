'use strict';

const { ExpenseModel } = require('../models/expenseModel.js');
const { Op, sequelize } = require('sequelize');

const getAll = async(requestBody) => {
  const {
    userId,
    categories,
    from,
    to,
  } = requestBody;

  const where = {};

  if (userId) {
    where.userId = Number(userId);
  }

  if (categories) {
    where.categories = { [Op.in]: categories };
  }

  if (from) {
    where.spentAt = { [Op.gte]: from };
  }

  if (to) {
    where.spentAt = {
      ...where.spentAt,
      [Op.lte]: to,
    };
  }

  const expenses = await ExpenseModel.findAll({
    where,
    order: [
      'spentAt',
    ],
  });

  return expenses;
};

const getById = async(expenseId) => {
  const foundExpense = await ExpenseModel.findByPk(expenseId);

  return foundExpense;
};

const create = async(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const tempValues = {
    userId,
    spentAt,
    title,
    amount,
    category,
  };
  const values = note
    ? {
      ...tempValues,
      note,
    }
    : tempValues;

  const createdExpense = await ExpenseModel.create(values);

  return createdExpense;
};

const remove = async(expenseId) => {
  if (!getById(expenseId)) {
    return false;
  }

  await ExpenseModel.destroy({
    where: {
      id: expenseId,
    },
  });
};

const update = async(expenseId, requestBody) => {
  const foundExpense = await getById(expenseId);

  if (!foundExpense) {
    return null;
  }

  const {
    title,
    spentAt,
    amount,
    category,
    note,
  } = requestBody;

  const updatedExpense = await ExpenseModel.update({
    title: title || foundExpense.title,
    spentAt: spentAt || foundExpense.spentAt,
    amount: amount || foundExpense.amount,
    category: category || foundExpense.category,
    note: note || foundExpense.note,
  }, {
    where: {
      id: expenseId,
    },
  });

  return updatedExpense;
};

const reset = async() => {
  const expenses = await getAll();

  return sequelize.transaction(async(t) => {
    for (const expense of expenses) {
      await remove(expense.id);
    }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
