'use strict';

const {
  getAllExpenses,
  getExpenseById,
  updateExpenses,
  removeExpenses,
  createNewExpense,
} = require('../services/expenses');

const { getUserById } = require('../services/users');

const addNew = async(req, res) => {
  const { userId, title, amount, category, note } = req.body;

  const foundUser = await getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExtense = await createNewExpense(
    userId,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExtense);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpens = await getExpenseById(expenseId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpens);
};

const getMany = async(req, res) => {
  const expenses = await getAllExpenses();

  const { userId, category, to, from } = req.query;

  if (from && to) {
    const foundExpensesByDate = expenses.filter(
      (expense) => (
        new Date(expense.spent_at).getTime() > new Date(from).getTime()
        && new Date(expense.spent_at).getTime() < new Date(to).getTime()
      )
    );

    res.send(foundExpensesByDate);
    res.statusCode = 200;

    return;
  }

  if (category) {
    const foundExpensesByCategory = expenses.filter(
      (expense) =>
        expense.userId === userId
        && expense.category === category
    );

    res.send(foundExpensesByCategory);
    res.statusCode = 200;

    return;
  }

  if (userId) {
    const foundExpensesByUserId = expenses.filter(
      (expense) => expense.userId === userId
    );

    res.send(foundExpensesByUserId);
    res.statusCode = 200;

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  const filteredExpenses = await getExpenseById(expenseId);

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  removeExpenses(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpenses = await getExpenseById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  const { title } = req.body;

  updateExpenses({
    expenseId,
    title,
  });

  res.send(foundExpenses);
  res.statusCode = 200;
};

module.exports = {
  getMany,
  getOne,
  addNew,
  remove,
  update,
};
