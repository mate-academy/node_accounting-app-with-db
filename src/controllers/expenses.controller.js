const expensesService = require('../services/expenses.service.js');

const getAll = async (req, res) => {
  const queries = req.query;

  const allExpenses = await expensesService.getAll(queries);

  return res.status(200).send(allExpenses);
};

const create = async (req, res) => {
  const body = req.body;
  const newExpense = await expensesService.create(body);

  if (!newExpense || newExpense === false) {
    return res.status(400).send('Bad request');
  }

  return res.status(201).send(newExpense);
};

const getById = async (req, res) => {
  const targetId = req.params.id;
  const targetExpense = await expensesService.getById(targetId);

  if (targetExpense === null) {
    return res.status(404).send('Not Found');
  }

  res.json(targetExpense);
};

const remove = async (req, res) => {
  const targetId = req.params.id;
  const index = await expensesService.remove(targetId);

  if (index === false) {
    return res.status(404).send('Not Found');
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const targetId = req.params.id;

  const targetExpense = await expensesService.update(targetId, req.body);

  if (!targetExpense) {
    return res.status(404).send('Not Found');
  }

  res.send(targetExpense);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
