'use strict';

const expensesService = require('../services/expenses.service');
const { getOne: getOneUser } = require('../services/user.service');

const get = async(req, res) => {
  const userId = parseInt(req.query.userId);
  const { categories, from, to } = req.query;

  const filteredExpenses = await expensesService.filter(
    userId,
    categories,
    from,
    to,
  );

  res.json(filteredExpenses);
};

const create = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = await getOneUser(userId);

  if (
    !userId
    || typeof spentAt !== 'string'
    || !title
    || !amount
    || !user
  ) {
    return res.sendStatus(400);
  }

  const spentProduct = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(spentProduct);
};

const getOne = async(req, res) => {
  const id = parseInt(req.params.id);
  const product = await expensesService.getOne(id);

  if (typeof id !== 'number' || !id) {
    return res.sendStatus(400);
  }

  if (!product) {
    return res.sendStatus(404);
  }

  res.status(200).send(product);
};

const remove = async(req, res) => {
  const id = parseInt(req.params.id);
  const product = await expensesService.getOne(id);

  if (!product) {
    return res.sendStatus(404);
  }

  await expensesService.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const id = parseInt(req.params.id);
  const { ...args } = req.body;
  const product = await expensesService.getOne(id);

  if (!product) {
    return res.sendStatus(404);
  }

  const [, updatedProduct] = await expensesService.update(id, args);

  res.status(200).send(updatedProduct);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
