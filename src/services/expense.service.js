'use strict';

const { models } = require('../models/models');

const { Expense } = models;

const getAll = async () => {
  return Expense.findAll({
    order: [['createdAt', 'DESC']],
  });
};

const create = async (title, amount, userId) => {
  return Expense.create({ title, amount, userId });
};

module.exports = {
  getAll,
  create,
};
