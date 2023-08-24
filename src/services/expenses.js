/* eslint-disable space-before-function-paren */
/* eslint-disable max-len */
'use strict';

const { Expense } = require('../models/Expense.js');

const normalize = ({ userId, spentAt, title, amount, category, note }) => {
  return {
    userId, spentAt, title, amount, category, note,
  };
};

const getAll = async () => {
  const result = await Expense.findAll({
    order: 'spent_at',
    logging: false,
  });

  return result;
};

const getOne = async (id) => {
  return Expense.findByPk(id);
};

const create = async ({
  userId, spentAt, title, amount, category, note,
}) => {
  return Expense.create({
    userId, spentAt, title, amount, category, note,
  });
};

const remove = async (id) => {
  return Expense.destroy({ where: { id: id } });
};

const update = async (id, body) => {
  return Expense.update(body, {
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
  normalize,
};
