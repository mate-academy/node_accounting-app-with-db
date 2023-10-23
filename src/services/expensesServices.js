'use strict';

const { sequelize } = require('../db.js');
const { Expenses } = require('../models/expense.js');
const { Op } = require('sequelize');

const normalize = (resultObj) => {
  if (Array.isArray(resultObj)) {
    const newResultObj = [...resultObj];

    return newResultObj.map(obj => {
      delete obj.dataValues.createdAt;
      delete obj.dataValues.updatedAt;

      return obj;
    });
  } else {
    const newResultObj = { ...resultObj };

    delete newResultObj.dataValues.createdAt;
    delete newResultObj.dataValues.updatedAt;

    return newResultObj.dataValues;
  }
};

const getAll = async({
  userId,
  category,
  from,
  to,
}) => {
  const expenses = await Expenses.findAll({
    where: {
      userId,
      category,
      spentAt: {
        [Op.between]: [from, to],
      },
    },
    order: [['createdAt', 'DESC']],
  });

  return expenses;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return Expenses.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const getExpenseById = async(expenseId) => {
  return Expenses.findByPk(expenseId);
};

const removeExpense = async(expenseId) => {
  await sequelize.transaction(async(t) => {
    await Expenses.destroy({
      where: { id: expenseId },
    });
  });
};

const updateExpense = async(expenseId, params) => {
  await Expenses.update({
    ...params,
    updatedAt: new Date(),
  }, {
    where: {
      id: expenseId,
    },
  });
};

module.exports = {
  getAll,
  createExpense,
  getExpenseById,
  removeExpense,
  updateExpense,
  normalize,
};
