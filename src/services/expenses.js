'use strict';

const { Expense } = require('../modules/Expense');
const { filterByQuery } = require('../utils/filterByQuery');

function getAll(queries) {
  const whereConditions = filterByQuery(queries);

  return Expense.findAll({
    where: whereConditions,
  });
}

function findById(expensesId) {
  return Expense.findByPk(Number(expensesId));
}

function create(data) {
  return Expense.create({ ...data });
}

async function update(id, body) {
  const updatedExpenseId = await Expense.update({ ...body }, {
    where: { id },
  });

  return findById(updatedExpenseId);
}

function remove(id) {
  return Expense.destroy({
    where: { id },
  });
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
