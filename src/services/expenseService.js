'use strict';

const { expenseModel } = require('../models/expenseModel');

const getAll = () => {
  const result = expenseModel.findAll();

  return result;
};

const getById = (id) => {
  const result = expenseModel.findByPk(id);

  return result;
};

const create = (exp) => {
  const expense = expenseModel.create({ ...exp });

  return expense;
};

const remove = (id) => {
  expenseModel.destroy({
    where: {
      id,
    },
  });
};

const update = (id, params) => {
  return expenseModel.update({ ...params }, {
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
