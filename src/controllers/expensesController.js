import * as expensesServices from '../services/expensesService.js';

export const getExpenses = async(req, res) => {
  const expenses = await expensesServices.getExpenses();

  res.send(expenses.map(expensesServices.normalize));
};

export const getExpense = async(req, res) => {
  const { expenseId } = req.params;

  try {
    const searchExpense = await expensesServices.getExpense(expenseId);

    res.send(expensesServices.normalize(searchExpense));
  } catch (error) {
    res.sendStatus(404);
  }
};

export const createExpense = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(await expensesServices.createExpense(req.body));
};

export const removeExpense = async(req, res) => {
  const { expenseId } = req.params;

  try {
    await expensesServices.removeExpense(expenseId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

export const updateExpence = async(req, res) => {
  const { expenseId } = req.params;

  try {
    const foundExpense = await expensesServices.getExpense(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);
    }

    await expensesServices.updateExpense(expenseId, req.body);

    res.send(foundExpense);
  } catch (error) {
    res.sendStatus(404);
  }
};
