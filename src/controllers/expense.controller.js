'use strict';

const exspresService = require('../services/expense.service');
const usersService = require('../services/users.service');

const get = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const result = await exspresService.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.send(result);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await exspresService.getById(id);

  if (!data) {
    res.sendStatus(404);

    return;
  }
  res.send(data);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined
  ) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = await exspresService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const expense = await exspresService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await exspresService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;

  const expense = await exspresService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = await exspresService.update(id, req.body);

  res.send(newExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
