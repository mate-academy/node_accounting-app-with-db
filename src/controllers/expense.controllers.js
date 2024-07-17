'use strict';

const expenseServices = require('../services/expense.services');
const userServices = require('../services/user.service');
const codeStatuses = require('../variables');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = codeStatuses.SUCCESS_CODE_STATUS;

  res.send(
    await expenseServices.getAll({
      userId,
      categories,
      from,
      to,
    }),
  );
};

const get = async (req, res) => {
  const { id } = req.params;

  const choosedExpense = await expenseServices.getById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStatuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  res.send(choosedExpense);
};

const create = async (req, res) => {
  const data = req.body;

  if (!(await userServices.getById(data.userId))) {
    res.sendStatus(codeStatuses.BAD_REQUEST_CODE_STATUS);

    return;
  }

  const newExpense = await expenseServices.create(data);

  res.status(201).send(newExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await expenseServices.getById(id))) {
    res.sendStatus(codeStatuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  await expenseServices.remove(id);

  res.sendStatus(codeStatuses.UNDERSTANDING_CODE_STATUS);
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const choosedExpense = await expenseServices.getById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStatuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  const updatedExpense = await expenseServices.update(id, data);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getAll,
  create,
  remove,
  update,
};
