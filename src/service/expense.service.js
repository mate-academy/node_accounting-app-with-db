'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/models').models;

const get = async({ userId, categories, from, to }) => {
  const filters = {};

  !isNaN(userId) && (filters.userId = userId);
  categories && (filters.category = categories);
  (from || to) && (filters.spentAt = {});
  from && (filters.spentAt[Op.gte] = from);
  to && (filters.spentAt[Op.lte] = to);

  return Expense.findAll({ where: filters });
};

const getById = async(id) => {
  return Expense.findByPk(id);
};

const add = async({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId, spentAt, title, amount, category, note,
  });
};

const remove = async(id) => {
  await Expense.destroy({
    where: { id },
  });
};

const update = async(id, dataToUpdate) => {
  const data = { ...dataToUpdate };

  Object.keys(data)
    .forEach(key => typeof data[key] === 'undefined' && delete data[key]);

  await Expense.update(data, { where: { id } });
};

module.exports = {
  get,
  getById,
  add,
  remove,
  update,
};
