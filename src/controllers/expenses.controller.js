'use strict';

const expensesService = require('../services/expenses.service');
const responseCodes = require('../constants/responseCodes');
const { filterExpensesByQuery } = require('../helpers/filterExpensesByQuery');
const userServices = require('../services/users.service');

const REQUIRED_KEYS_TO_CREATE
  = ['userId', 'title', 'amount', 'category'];

const POSSIBLE_KEYS_TO_UPDATE
  = ['spentAt', 'title', 'amount', 'category', 'note'];

const get = async(req, res) => {
  let expenses = await expensesService.getAll();

  if (req.query && expenses.length) {
    expenses = filterExpensesByQuery(expenses, req.query);
  }

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const expense = await expensesService.userServices.getById(id);

  if (!expense) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.send(expense);
};

const add = async(req, res) => {
  const expenses = req.body;

  const isObjectValid = REQUIRED_KEYS_TO_CREATE
    .every(key => Boolean(expenses[key]));

  if (!isObjectValid) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const isUser = await userServices.getById(expenses.userId);

  if (!isUser) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const newExpense = await expensesService.add(expenses);

  res.statusCode = responseCodes.CREATED;
  res.send(newExpense);
};

const update = async(req, res) => {
  const { id } = req.params;
  const expenses = req.body;

  if (!expenses) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const isDataValid = Object.keys(expenses)
    .every(key => POSSIBLE_KEYS_TO_UPDATE.includes(key));

  if (!isDataValid) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const updatedExpense = await expensesService.update(id, expenses);

  if (!updatedExpense) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.statusCode = responseCodes.SUCCESS;
  res.send(updatedExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const isExpenseDeleted = await expensesService.remove(id);

  if (!isExpenseDeleted) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.sendStatus(responseCodes.DELETED);
};

module.exports = {
  get,
  getOne,
  add,
  update,
  remove,
};
