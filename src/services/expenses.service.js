'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../controllers/db/models/expense.model');

const normalizeExpenseData = ({
  id,
  userId,
  spentAt,
  title,
  category,
  amount,
  note,
}) => ({
  id,
  userId,
  spentAt,
  title,
  category,
  amount,
  note,
});

const getAllExpenses = (querys) => {
  const queryEntries = Object.entries(querys);

  if (!queryEntries.length) {
    return Expense.findAll({
      order: ['spentAt'],
    });
  }

  return Expense.findAll({
    where: {
      [Op.or]: queryEntries
        .map(query => Object.fromEntries([query])),
    },
    order: ['spentAt'],
  });
};

const createExpenses = ({
  id,
  userId,
  spentAt = new Date(),
  title,
  category,
  amount,
  note = '',
}) => {
  return Expense.create({
    id,
    userId,
    spentAt,
    title,
    category,
    amount,
    note,
  });
};

const getExpensesById = (id) => {
  return Expense.findByPk(id);
};

const deleteExpensesById = (id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpensesById = (id, fields) => {
  const fieldsToUpdate = { ...fields };

  delete fieldsToUpdate.id;
  delete fieldsToUpdate.updatedAt;
  delete fieldsToUpdate.createdAt;

  return Expense.update({
    ...fieldsToUpdate,
  }, {
    where: {
      id,
    },
  });
};

module.exports = {
  getAllExpenses,
  createExpenses,
  getExpensesById,
  deleteExpensesById,
  updateExpensesById,
  normalizeExpenseData,
};
