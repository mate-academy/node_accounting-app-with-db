import * as expensesService from '../services/expenses.service.js';

export const getExpenses = async (req, res) => {
  res.send(await expensesService.getAllExpenses());
};

export const getByIdExpenses = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

export const removeExpense = async (req, res) => {
  const { id } = req.params;

  if (!(await expensesService.getExpenseById(id))) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteExpense(id);

  res.sendStatus(204);
};

export const addExpenses = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpens = await expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(newExpens);
};

export const patchExpenses = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expens = await expensesService.getExpenseById(id);

  if (!spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  if (
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof note !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  if (!expens) {
    res.sendStatus(404);

    return;
  }

  await expensesService.updateExpense({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  const updatedExpense = await expensesService.getExpenseById(id);

  res.send(updatedExpense);
};
