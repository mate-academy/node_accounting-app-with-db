const { Expense } = require('../models/Expense.model');
const expensesSorter = require('../sorters/expenses.sorter');

async function getAll() {
  const data = await Expense.findAll();

  return data;
}

async function getSortedExpenses(userId, category, from, to) {
  let sortedExpenses = await getAll();

  sortedExpenses = expensesSorter.sortByUserId(userId, sortedExpenses);
  sortedExpenses = expensesSorter.sortByCategory(category, sortedExpenses);
  sortedExpenses = expensesSorter.sortByFrom(from, sortedExpenses);
  sortedExpenses = expensesSorter.sortByTo(to, sortedExpenses);

  return sortedExpenses.sort((a, b) => a.id - b.id);
}

async function getOne(id) {
  const data = await Expense.findByPk(+id);

  return data;
}

async function create(data) {
  const returnedData = await Expense.create(data, { returning: true });

  return returnedData;
}

async function update(id, data) {
  await Expense.update(data, { where: { id } });

  const returnData = await getOne(id);

  return returnData;
}

async function deleteOne(id) {
  await Expense.destroy({ where: { id } });
}

module.exports = {
  getAll,
  getSortedExpenses,
  getOne,
  create,
  update,
  deleteOne,
};
