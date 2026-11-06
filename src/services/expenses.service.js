const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

function getAll(query) {
  const { userId, from, to, category } = query;
  const filterParams = {
    userId,
    from,
    to,
    category,
  };

  const validParams = Object.entries(filterParams).reduce((acc, param) => {
    // eslint-disable-next-line no-unused-vars
    const [key, value] = param;

    if (!value) {
      return acc;
    }

    return { ...acc, [key]: value };
  }, {});

  const { from: fromDate, to: toDate, ...rest } = validParams;
  const isDateFilter = fromDate && toDate;

  if (isDateFilter) {
    const spentAt = { [Op.between]: [fromDate, toDate] };

    return Expense.findAll({ where: { ...rest, spentAt } });
  }

  return Expense.findAll({
    where: validParams,
  });
}

function getById(id) {
  return Expense.findByPk(id);
}

function create(expenseBody) {
  return Expense.create(expenseBody);
}

function deleteById(id) {
  return Expense.destroy({
    where: { id },
  });
}

function update({ id, expenseBody }) {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  return Expense.update(expenseBody, { where: { id } });
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
