'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = async(req, res) => {
  const query = req.query;

  res.json(await expenseService.readAll(query));
};

const get = async(req, res) => {
  const { id } = req.params;
  const expense = await expenseService.read(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(expense);
};

const create = async(req, res) => {
  const body = req.body;

  if ((!body.hasOwnProperty('userId')
    || !body.hasOwnProperty('spentAt')
    || !body.hasOwnProperty('title')
    || !body.hasOwnProperty('amount'))
    || !await userService.read(+body.userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.create(body);

  res.status(201).json(expense);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const expense = await expenseService.read(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(expense.id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = await expenseService.read(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.update(+id, body);

  res.send(await expenseService.read(+id));
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
