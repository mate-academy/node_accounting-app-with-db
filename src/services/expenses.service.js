'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../controllers/db/models/expense.model');

const getAllExpenses = (querys) => {
  const queryEntries = Object.entries(querys);

  if (!queryEntries.length) {
    return Expense.findAll();
  }

  return Expense.findAll({
    where: {
      [Op.or]: queryEntries
        .map(query => Object.fromEntries([query])),
    },
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
};
