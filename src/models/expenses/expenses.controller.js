import * as expensesService from './expenses.service.js';
import * as userService from '../user/user.service.js';

const getAll = async(req, res) => {
  const { categories, from, to } = req.query;
  const userId = +req.query.userId;

  const expenses = await expensesService.getAll({
    userId,
    from,
    to,
    categories: Array.isArray(categories)
      ? categories
      : [categories].filter(c => c),
  });

  res.status(200).send(expenses);
};

const getById = async(req, res) => {
  const id = +req.params.id;

  const expense = await expensesService.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const remove = async(req, res) => {
  const id = +req.params.id;

  const expense = await expensesService.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(204);
};

const create = async(req, res) => {
  const {
    spentAt,
    title,
    amount,
    category,
    note = null,
  } = req.body;
  const userId = +req.body.userId;

  const user = await userService.getOne(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  if (
    !spentAt
    || !title
    || !category
    || !amount
  ) {
    res.sendStatus(404);

    return;
  }

  const newExpense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const update = async(req, res) => {
  const id = +req.params.id;
  const amount = +req.body.amount;

  const {
    spentAt,
    title,
    category,
    note,
  } = req.body;

  if (
    !spentAt
    || !title
    || !category
    || !note
    || typeof amount !== 'number'
    || Number.isNaN(amount)
  ) {
    res.sendStatus(400);

    return;
  }

  const user = await expensesService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await expensesService.update({
    id,
    spentAt,
    title,
    category,
    note,
    amount,
  });

  const updatedExpense = await expensesService.getOne(id);

  res.status(200).send(updatedExpense);
};

export {
  getAll,
  getById,
  remove,
  create,
  update,
};
