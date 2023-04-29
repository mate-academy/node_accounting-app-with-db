'use strict';

const { Expense } = require('../models/Expense');
const { Op } = require('sequelize');

const getAll = ({
  userId,
  categories,
  from,
  to,
}) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories && categories.length > 0) {
    where.category = { [Op.in]: categories };
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

  return Expense.findAll({
    where,
    order: ['id'],
  });
};

const getById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const create = (expenseBody) => {
  return Expense.create(expenseBody);
};

const remove = (expenseId) => {
  return Expense.destroy({
    where: { id: expenseId },
  });
};

const update = (expenseId, expenseBody) => {
  return Expense.update(expenseBody, {
    where: { id: expenseId },
    returning: true,
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
