'use strict';

const {
  getFilteredExpenses,
  getAllExpenses,
  patchExpense,
  removeExpense,
  addNewExpense,
  isUserIdExists,
  getExpenseById,
} = require('../services/expensesService.js');
const { generateUniqueID, checkId } = require('../helpers.js');

const getExpenses = async(req, res) => {
  const { user_id, categories, from, to } = req.query;
  const expenses = await getAllExpenses();

  if (user_id || categories || from || to) {
    const filteredExpenses = await getFilteredExpenses(
      user_id,
      categories,
      from,
      to
    );

    res.status(200).send(filteredExpenses);

    return;
  }

  res.status(200).send(expenses);
};

const createExpense = async(req, res) => {
  const { user_id, spent_at, title, amount, category, note } = req.body;
  const body = [...Object.values(req.body)];
  const checkIfUserExist = await isUserIdExists(user_id);

  if (body.some((value) => value === undefined) || !checkIfUserExist) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: generateUniqueID(),
    user_id: Number(user_id),
    spent_at,
    title,
    amount: Number(amount),
    category,
    note,
  };

  await addNewExpense(newExpense);

  res.status(201).send(newExpense);
};

const getExpense = async(req, res) => {
  const { id } = req.params;

  checkId(res, id);

  const foundExpense = await getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpense);
};

const deleteExpense = async(req, res) => {
  const { id } = req.params;

  checkId(res, id);

  const foundExpense = await removeExpense(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const modifyExpense = async(req, res) => {
  const { id } = req.params;
  const { user_id, spent_at, title, amount, category, note } = req.body;

  checkId(res, id);

  if (user_id || !spent_at || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await patchExpense({
    user_id, spent_at, title, amount, category, note,
  }, id);

  res.status(200).send(foundExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  modifyExpense,
};
