'use strict';

const {
  models: { Expense },
} = require('../models/models');

const getAll = (where) => {
  return Expense.findAll({ where, order: [['id', 'ASC']] });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = (data) => {
  return Expense.create(data);
};

const update = (expense, data) => {
  return expense.update(data);
};

const remove = (expense) => {
  return expense.destroy();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
