'use strict';

const expensesService = require('../services/expense.service');
const usersService = require('../services/user.service');
const { messages } = require('../types/messages');
const { statusCode } = require('../types/status.messages');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId && !categories) {
    res.send(await expensesService.getByUserId(+req.query.userId));

    return;
  }

  if (from && to) {
    res.send(await expensesService.getByDate(from, to));

    return;
  }

  if (categories) {
    res.send(await expensesService.getByCategory(+userId, categories));

    return;
  }

  res.send(await expensesService.getAll());
};

const getById = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(+id);

  if (!expense) {
    res.status(statusCode.notFound).send(messages.expense.notFound);

    return;
  }

  res.status(statusCode.ok).send(expense);
};

const create = async (req, res) => {
  const { title, amount, spentAt, userId } = req.body;

  if (!title || !amount || !spentAt) {
    res.status(statusCode.badRequest).send(messages.expense.requiredFields);

    return;
  }

  const user = await usersService.getById(userId);

  if (!user) {
    res.status(statusCode.badRequest).send(messages.user.userNotFound);

    return;
  }

  const expense = await expensesService.create(req.body);

  res.status(statusCode.created).send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const removed = await expensesService.remove(+id);

  if (!removed) {
    res.status(statusCode.notFound).send(messages.expense.notFound);

    return;
  }

  res.status(statusCode.deleted).send(messages.expense.deleted);
};

const update = async (req, res) => {
  const { id } = req.params;
  const toUpdate = req.body;
  const expense = await expensesService.getById(+id);

  if (!expense) {
    res.status(statusCode.notFound).send(messages.expense.notFound);

    return;
  }

  await expensesService.update(id, toUpdate);

  const updated = await expensesService.getById(id);

  if (!updated) {
    res.status(statusCode.notFound).send(messages.expense.notFound);

    return;
  }

  res.status(statusCode.ok).send(updated);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
