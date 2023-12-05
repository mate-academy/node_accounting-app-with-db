import * as userService from '../services/user.service.js';
import * as expenseService from '../services/expense.service.js';
import { getFiltered } from '../helpers/filterData.js';

export const getExpences = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expenseService.get();

  if (userId || categories || from || to) {
    const filterExpenses = getFiltered(expenses, userId, categories, from, to);

    if (filterExpenses.length) {
      res.send(filterExpenses);

      return;
    } else {
      res.sendStatus(404);

      return;
    }
  }

  res.statusCode = 200;
  res.send(expenses);
};

export const getOne = async(req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

export const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!(await userService.getById(userId))) {
    return res.sendStatus(404);
  }

  if (!spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  try {
    const newExpense = await expenseService.create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.statusCode = 201;
    res.send(newExpense);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const update = async(req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!(await expenseService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  const upd = await expenseService
    .update(id, spentAt, title, amount, category, note);

  res.send(upd);
};

export const remove = async(req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);
  res.sendStatus(204);
};
