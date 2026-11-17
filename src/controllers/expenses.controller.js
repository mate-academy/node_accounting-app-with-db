/* eslint-disable */

const expensesService = require('../services/expenses.service.js');

async function get(req, res) {
  const { userId, categories, from, to } = req.query;
  const expenses = await expensesService.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.send(expenses);
}

async function getOne(req, res) {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

async function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !category) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
}

async function update(req, res) {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.update({ id, ...req.body });

  res.json(updatedExpense);
}

async function remove(req, res) {
  const { id } = req.params;

  if (!await expensesService.getById(id)) {
    return res.sendStatus(404);
  }

  await expensesService.remove(id);
  res.sendStatus(204);
}

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
