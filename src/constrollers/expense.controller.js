const { validateUUID } = require('../helpers/validators');
const { Expense, ...expenseModel } = require('../models/Expense.model');

const create = async (req, res) => {
  const expense = req.body;

  if (!validateExpense(expense)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseModel.create(expense);

  if (!newExpense) {
    res.sendStatus(501);

    return;
  }

  res.statusCode = 201;
  res.send(newExpense);
};

const getAll = async (req, res) => {
  const query = req.query;
  const expenses = await expenseModel.getAll(query);

  if (!expenses) {
    res.sendStatus(501);
  }

  res.send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!validateUUID(id)) {
    res.sendStatus(404);

    return;
  }

  const expense = await expenseModel.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const update = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  if (!validateUpdated(body) || !validateUUID(id)) {
    res.sendStatus(404);

    return;
  }

  const result = await expenseModel.update(id, body);

  if (!result) {
    res.sendStatus(404);

    return;
  }

  const updated = await expenseModel.getOne(id);

  res.send(updated);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!validateUUID(id)) {
    res.sendStatus(404);

    return;
  }

  const result = await expenseModel.remove(id);

  if (!result) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

function validateExpense(expense) {
  const { userId, category, title, amount, spentAt, note } = expense;

  if (!userId || !validateUUID(userId)) {
    return false;
  }

  if (category && typeof category !== 'string') {
    return false;
  }

  if (!title || typeof title !== 'string') {
    return false;
  }

  if (!amount || typeof amount !== 'number') {
    return false;
  }

  if (!spentAt || typeof spentAt !== 'string') {
    return false;
  }

  if (note && typeof note !== 'string') {
    return false;
  }

  return true;
}

function validateUpdated(body) {
  const { category, title, amount, note } = body;

  if (category && typeof category !== 'string') {
    return false;
  }

  if (title && typeof title !== 'string') {
    return false;
  }

  if (amount && typeof amount !== 'number') {
    return false;
  }

  if (note && typeof note !== 'string') {
    return false;
  }

  return true;
}

module.exports = {
  getAll,
  create,
  getOne,
  update,
  remove,
};
