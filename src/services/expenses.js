'use strict';

const { Expence } = require('../models/Expense');

function normalize({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
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

function create(expanseData) {
  return Expence.create(expanseData);
}

async function getAll({ userId, category, from, to }) {
  const expanses = await Expence.findAll({
    order: ['createdAt'],
  });

  return expanses.filter((expense) => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoryMatch = category
      ? expense.category === category
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoryMatch && isFromMatch && isToMatch;
  });
}

function getById(expenseId) {
  return Expence.findByPk(+expenseId);
}

function update(expenseId, receivedData) {
  return Expence.update(receivedData, {
    where: {
      id: +expenseId,
    },
  });
}

function remove(expenseId) {
  Expence.destroy({
    where: {
      id: +expenseId,
    },
  });
}

module.exports = {
  normalize,
  create,
  getAll,
  getById,
  update,
  remove,
};
