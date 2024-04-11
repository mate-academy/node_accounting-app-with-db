import * as expensesServices from '../services/expenses.js';

export const getAll = async (req, res) => {
  const expenses = await expensesServices.getAll();

  res.statusCode = 201;
  res.send(expenses);
};

export const getById = async (req, res) => {
  const { expenseId } = req.params;
  const expense = await expensesServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 201;
  res.send(expense);
};

export const create = async (req, res) => {
  const newExpenses = await expensesServices.create(req.body);

  res.statusCode = 201;
  res.send(newExpenses);
};

export const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }
  await expensesServices.remove(expenseId);
  res.sendStatus(204);
};

export const update = async (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { name, title, amount, date, category, note } = req.body;

  await expensesServices.update({
    id: foundExpense.id, name, title, amount, date, category, note,
  });
  res.send(foundExpense);
};
