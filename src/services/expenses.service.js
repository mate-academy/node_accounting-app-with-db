'use strict';

const { Expense } = require('../module/expense.moduls');

function normalize({ id, userId, spentAt, title, amount, category, note }) {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

const getAll = () => {
  return Expense.findAll({
    order: ['createdAt'],
  });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const postExpenses = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return Expense.create({
    userId, spentAt, title, amount, category, note,
  });
};

const update = ({
  id,
  data,
}) => {
  return Expense.update(data, {
    where: { id: id },
  });
};

const remove = (id) => {
  return Expense.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  postExpenses,
  update,
  remove,
  normalize,
};
