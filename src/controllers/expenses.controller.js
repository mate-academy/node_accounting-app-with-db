'use strict';

const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getAll = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  // Передаємо об'єкт з фільтрами в сервіс
  const expenses = await expensesService.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.json(expenses.map((expense) => expensesService.normalize(expense)));
};

const getOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  // eslint-disable-next-line no-console
  // console.log('expenses req.body:---', req.body);

  // Перевіряємо на undefined/null, щоб дозволити amount: 0
  if (userId === undefined || !spentAt || !title || amount === undefined) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create(
    userId,
    spentAt,
    title,
    +amount,
    category || '',
    note || '',
  );

  res.status(201).json(expense);
};

const deleteOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(req.params.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = req.params.id;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updates = { ...req.body };

  // if (updates.userId) {
  //   updates.userId = +updates.userId;
  // }

  if (updates.amount) {
    updates.amount = +updates.amount;
  }

  const updatedExpense = await expensesService.update({
    id,
    ...updates,
  });

  res.json(updatedExpense);
};

const expensesController = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};

module.exports = {
  expensesController,
};
