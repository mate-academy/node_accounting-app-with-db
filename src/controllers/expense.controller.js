'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    const query = req.query;

    const filteredExpenses = (await expenseService.getAll()).filter(
      (expense) => {
        return Object.entries(query).every(([key, value]) => {
          if (key === 'from') {
            return new Date(expense.spentAt) >= new Date(value);
          }

          if (key === 'to') {
            return new Date(expense.spentAt) <= new Date(value);
          }

          if (key === 'categories') {
            const categoriesArray = value.split(',');

            return categoriesArray.includes(expense.category);
          }

          return expense[key]?.toString() === value.toString();
        });
      },
    );

    if (filteredExpenses.length === 0) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(filteredExpenses);

    return;
  }

  res.statusCode = 200;
  res.send(await expenseService.getAll());
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.getByID(id);

  if (!newExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(newExpense);
};

const create = async (req, res) => {
  const { userId, title, amount, category, note, spentAt } = req.body;

  if (!userId || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const userExists = (await userService.getAll()).some(
    (user) => user.id === userId,
  );

  if (!userExists) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.create({
    userId,
    title,
    amount,
    category,
    note,
    spentAt,
  });

  res.statusCode = 201;
  res.send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!(await expenseService.getByID(id))) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!(await expenseService.getByID(id))) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expenseService.update({ id, updateFields });

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
