const { validationResult, matchedData } = require('express-validator');
const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/user.service.js');
const { Expense } = require('../models/Expense.model.js');

const getAll = async (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const params = matchedData(req, { locations: ['query'] });

  const expenses = await expensesService.getAll(params);

  res.send(expenses);
};

const getOne = async (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const expensesId = req.params.id;

  const expenses = await expensesService.getById(expensesId);

  if (!expenses) {
    return res.status(404).send('Not Found');
  }

  res.send(expenses);
};

const create = async (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const data = matchedData(req, { locations: ['body'] });

  const user = await usersService.getById(data.userId);

  if (!user) {
    return res.status(400).send('Bad Request');
  }

  const newExpenses = await expensesService.create({ ...data });

  res.status(201).send(newExpenses);
};

const update = async (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const data = matchedData(req, { locations: ['body'] });
  const expensesId = req.params.id;

  const updatedExpenses = await expensesService.updateById({
    id: expensesId,
    ...data,
  });

  if (!updatedExpenses[0]) {
    return res.status(404).send('Not Found');
  }

  res.send(await Expense.findByPk(expensesId));
};

const remove = async (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const expensesId = req.params.id;

  const expenses = await expensesService.getById(expensesId);

  if (!expenses) {
    return res.status(404).send('Not Found');
  }

  await expensesService.deleteById(expensesId);

  res.status(204).send('Expenses removed');
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
