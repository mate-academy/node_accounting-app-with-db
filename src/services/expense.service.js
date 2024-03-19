'use strict';

const { createWhereObj } = require('../utils/createWhereObj');
const { Expense } = require('../models/Expense.model');

const readAll = async(params) => {
  const expenses = await Expense.findAll(createWhereObj(params));

  return expenses;
};

const read = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async(fields) => {
  const expense = await Expense.create({ ...fields });

  return expense;
};

const remove = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async(id, fields) => {
  await Expense.update({ ...fields }, {
    where: {
      id,
    },
  });
};

module.exports = {
  readAll,
  read,
  create,
  remove,
  update,
};
