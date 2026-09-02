'use strict';

const expressService = require('../services/expense.service');
const usersService = require('../services/users.service');

const get = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const result = await expressService.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.send(result);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const data = await expressService.getById(id);

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

  const newExpense = await expressService.create({
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

  const expense = await expressService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expressService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;

  const expense = await expressService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = await expressService.update(id, req.body);

  res.send(newExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
