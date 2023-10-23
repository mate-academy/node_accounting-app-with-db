'use strict';

const status = require('../utils/constants');
const expensesService = require('../services/expenses.services');
const userService = require('../services/users.services');
const { expensesFilter } = require('../utils/expensesFilter');
const idGenerator = require('../utils/idGenerator');

const REQUIRED_KEYS_TO_UPDATE
  = ['spentAt', 'title', 'amount', 'category', 'note'];

const getAll = async(req, res) => {
  const expenses = await expensesFilter(req.query);

  res.send(expenses);
};

const getById = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(status.BAD_REQUEST);

    return;
  }

  const searcedExpense = await expensesService.getById(+id);

  if (!searcedExpense) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  res.status(status.OK).send(searcedExpense);
};

const post = async(req, res) => {
  const { userId, ...rest } = req.body;

  if (await !userService.getById(userId)) {
    return res.sendStatus(status.BAD_REQUEST);
  }

  const newExpense = {
    id: idGenerator(await expensesService.getAll()),
    userId,
    ...rest,
  };

  const addedExpens = await expensesService.add(newExpense);

  res.status(status.CREATED).send(addedExpens);
};

const update = async(req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  const isDataValid = Object.keys(req.body)
    .every(key => REQUIRED_KEYS_TO_UPDATE.includes(key));

  if (!isDataValid) {
    res.sendStatus(res.BAD_REQUEST);

    return;
  }

  const updateExpense = await expensesService.update(id, req.body);

  res.send(updateExpense);
};

const deleteById = async(req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  expensesService.deleteById(+id);

  res.sendStatus(status.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  post,
  update,
  deleteById,
};
