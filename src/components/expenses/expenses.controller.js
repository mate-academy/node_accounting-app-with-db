'use strict';

const expensesService = require('./expenses.service');

const create = async(req, res) => {
  const { title, amount, category } = req.body;

  if (!title && !amount && !category) {
    res.sendStatus(422);

    return;
  }

  const newExpense = await expensesService.create(req.params.id,
    {
      title,
      amount,
      category,
    },
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const getAll = async(req, res) => {
  const expenses = await expensesService.findAll();

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
};

const getById = async(req, res) => {
  const { id } = req.params;

  const expense = await expensesService.findById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const updateById = async(req, res) => {
  const { id } = req.params;

  const expense = await expensesService.findById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const { title, amount, category } = req.body;

  if (!title && !amount && !category) {
    res.sendStatus(422);

    return;
  }

  await expensesService.updateById(id, {
    title, amount, category,
  });

  res.statusCode = 200;
  res.send();
};

const removeById = async(req, res) => {
  const { id } = req.params;

  const user = await expensesService.findById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await expensesService.removeById(id);

  res.statusCode = 204;
  res.send();
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  removeById,
};
