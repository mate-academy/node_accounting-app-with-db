import * as expensesServices from '../services/expenses.js';

export const getAll = (req, res) => {
  const expenses = expensesServices.getAll();

  res.statusCode = 201;
  res.send(expenses);
};

export const getById = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 201;
  res.send(expense);
};

export const create = (req, res) => {
  const newExpenses = expensesServices.create(req.body);

  res.statusCode = 201;
  res.send(newExpenses);
};

export const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }
  expensesServices.remove(expenseId);
  res.sendStatus(204);
};

export const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { name, title, amount, date, category, note } = req.body;

  expensesServices.update({
    id: foundExpense.id, name, title, amount, date, category, note,
  });
  res.send(foundExpense);
};
