import * as userService from '../services/user.service.js';
import * as expenseService from '../services/expense.service.js';

export const getExpences = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId || categories || from || to) {
    const filterData = expenseService.getFiltered(userId, categories, from, to);

    if (filterData.length) {
      res.send(filterData);

      return;
    } else {
      res.sendStatus(404);

      return;
    }
  }

  res.statusCode = 200;
  res.send(expenseService.getAll());
};

export const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

export const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userService.getById(userId)
    || !spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  const newExpense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

export const update = (req, res) => {
  const { id } = req.params;

  const data = Object.fromEntries(Object.entries(req.body));

  if (!expenseService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update(id, data);

  res.send(updatedExpense);
};

export const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(Number(id))) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(Number(id));
  res.sendStatus(204);
};
