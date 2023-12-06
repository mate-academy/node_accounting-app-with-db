import * as userService from '../services/user.service.js';
import * as expenseService from '../services/expense.service.js';
import { defineFilterQuery } from '../helpers/defineFilterQuery.js';

export const getAll = async (req, res) => {
  const { userId, category, from, to } = req.query;
  const filterParams = defineFilterQuery(userId, category, from, to);

  if (Object.keys(filterParams).length === 0) {
    try {
      const expenses = await expenseService.get();

      res.status(200).send(expenses);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  } else {
    try {
      const filteredExpenses = await expenseService.getFiltered(filterParams);

      if (!filteredExpenses.length) {
        res.sendStatus(404);

        return;
      }

      res.status(200).send(filteredExpenses);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

export const create = async (req, res) => {
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

export const update = async (req, res) => {
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

export const remove = async (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);
  res.sendStatus(204);
};
