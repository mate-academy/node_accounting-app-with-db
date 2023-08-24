/* eslint-disable space-before-function-paren */
'use strict';

const { getUserById } = require('../services/users');
const {
  getAll,
  getOne,
  create,
  remove,
  update,
  normalize,
} = require('../services/expenses');

const getAllExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;
  let preparedExpenses = await getAll();

  if (userId) {
    preparedExpenses = preparedExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (from) {
    const fromDate = new Date(from);

    preparedExpenses = preparedExpenses.filter(expense =>
      new Date(expense.spentAt) > fromDate
    );
  }

  if (to) {
    const toDate = new Date(to);

    preparedExpenses = preparedExpenses.filter(expense =>
      new Date(expense.spentAt) < toDate
    );
  }

  if (categories) {
    preparedExpenses = preparedExpenses
      .filter(expense => expense.category === categories);
  }

  res.send(preparedExpenses.map(expense => normalize(expense)));
};

const getExpenseById = async (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(foundExpense));
};

const addExpense = async (req, res) => {
  const {
    userId, spentAt, title, amount, category, note,
  } = req.body;
  const foundUser = await getUserById(userId);

  if (userId && !foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;

  res.send(newExpense);
};

const removeExpense = async (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await remove(expenseId);
  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { expenseId } = req.params;
  const expense = await getOne(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const { body } = req;

  await update(expenseId, body);

  res.send(normalize(expense));
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
};
