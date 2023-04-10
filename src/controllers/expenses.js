'use strict';

const expenses = require('../services/expenses.js');
const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let allExpenses = expensesService.getALl();

  if (userId) {
    allExpenses = allExpenses.filter((expense) => (
      expense.userId === Number(userId))
    );
  }

  if (categories) {
    allExpenses = allExpenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    allExpenses = allExpenses.filter(({ spentAt }) => {
      const current = new Date(spentAt).getTime();
      const fromDate = new Date(from).getTime();
      const toDate = new Date(to).getTime();

      return fromDate < current && current < toDate;
    });
  }

  res.send(allExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);
  } else {
    res.send(foundExpense);
  }
};

const add = (req, res) => {
  const { userId, title, spentAt, amount, category, note } = req.body;

  const user = usersService.getById(userId);

  if (!userId || !title || !amount || !category || !user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create({
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundUser = expensesService.getById(expenseId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.update(foundExpense, { ...req.body });
  res.send(foundExpense);
};

module.exports = {
  initExpenses: () => expenses.resetAll(),
  getAll,
  getOne,
  add,
  remove,
  update,
};
