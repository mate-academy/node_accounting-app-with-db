import * as expensesServices from '../services/expenses.js';

export const getAll = async(req, res) => {
  try {
    const expenses = await expensesServices.getAll();

    res.statusCode = 201;
    res.send(expenses);
  } catch (error) {
    throw new Error(error)
  }
};

export const getById = async(req, res) => {
  const { expenseId } = req.params;
  try {
    const expense = expenseId ? await expensesServices.getById(expenseId) : null

    if (!expense) {
      res.sendStatus(404);
  
      return;
    }
  
    res.statusCode = 201;
    res.send(expense);
  } catch (error) {
    throw new Error(error)
  }
};

export const create = async(req, res) => {
  try {
    const newExpenses = await expensesServices.create(req.body);

    res.statusCode = 201;
    res.send(newExpenses);
  } catch (error) {
    throw new Error(error)
  }
};

export const remove = async(req, res) => {
  const { expenseId } = req.params;
  try {
    const foundExpense = await expensesServices.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);
  
      return;
    }

    await expensesServices.remove(expenseId);
    res.sendStatus(204);
  } catch (error) {
    throw new Error(error)
  }
};

export const update = async(req, res) => {
  const { expenseId } = req.params;
  try {
    const foundExpense = await expensesServices.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);
  
      return;
    }
  
    const { name, title, amount, date, category, note } = req.body;
  
    await expensesServices.update({
      id: foundExpense.id,
      name, title,
      amount,
      date,
      category,
      note
    });
    res.send(foundExpense);
  } catch (error) {
    throw new Error(error)
  }
};
