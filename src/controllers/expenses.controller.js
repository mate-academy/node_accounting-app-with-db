const {
  getAll,
  add,
  get,
  remove,
  update,
} = require('../services/expenses.service');

// const expensesService = require('../services/expenses.service');

const getExpenses = async (req, res) => {
  const queries = req.query;

  const allExpenses = await getAll(queries);

  return res.status(200).send(allExpenses);
};

const createExpense = async (req, res) => {
  const queries = req.body;
  const { userId, spentAt, title, amount, category, note } = queries;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined ||
    category === undefined
  ) {
    return res.status(400).send('Some of props are not filled');
  }

  const newExpense = await add(queries);

  if (!newExpense) {
    res.sendStatus(400);
  }

  res.status(201).json(newExpense);
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  const expense = await get(+id);

  if (!expense) {
    return res.status(404).send('Not Found');
  }

  res.status(200).json(expense);
};

const removeExpense = async (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request2');
  }

  const deletedNumber = await remove(+id);

  if (deletedNumber === 0) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request2');
  }

  if (Object.keys(expense).length === 0) {
    return res.status(400).send('Bad request1');
  }

  // if (get(+id)) {
  //   return res.status(404).send('Not found');
  // }

  let foundExpense = await update(+id, expense);

  if (!foundExpense) {
    return res.status(404).send('Not found');
  }

  res.status(200).json(foundExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
