'use strict';

const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');

const codeStatus = require('../constants/codeStatuses');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = codeStatus.SUCCESS;

  res.send(
    await expensesService.getAll({
      userId,
      categories,
      from,
      to,
    }),
  );
};

const get = async (req, res) => {
  const { id } = req.params;

  const choosedExpense = await expensesService.getById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  res.send(choosedExpense);
};

const create = async (req, res) => {
  const data = req.body;

  if (!(await usersService.getUserById(data.userId))) {
    res.sendStatus(codeStatus.BAD_REQUEST);

    return;
  }

  const newExpense = await expensesService.create(data);

  res.status(codeStatus.CREATED).send(newExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await expensesService.getById(id))) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(codeStatus.UNDERSTOOD);
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const choosedExpense = await expensesService.getById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  const updatedExpense = await expensesService.update(id, data);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getAll,
  create,
  remove,
  update,
};
