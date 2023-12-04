'use strict';

const ExpenseService = require('../services/ExpenseService');
const UserService = require('../services/UserService');

const get = async(req, res) => {
  const params = req.query;

  const expenses = await ExpenseService.get(params);

  res.send(expenses);
};

const getBySlug = async(req, res) => {
  const { slug } = req.params;

  if (slug) {
    const expense = await ExpenseService.getBySlug({ slug });

    if (expense) {
      res.send(expense);

      return;
    }

    res.sendStatus(404);

    return;
  }

  res.sendStatus(400);
};

const create = async(req, res) => {
  const { title, amount, category, note, spentAt, userSlug } = req.body;

  const user = await UserService.getBySlug({ slug: userSlug });

  if (
    ![title, amount, category, spentAt, userSlug]
      .some(item => item === undefined)
    && user
  ) {
    const newExpense = await ExpenseService.create({
      userId: user.dataValues.id,
      params: {
        title,
        amount,
        category,
        spentAt,
        note: note || null,
      },
    });

    res.status(201).send(newExpense);

    return;
  }

  res.sendStatus(400);
};

const update = async(req, res) => {
  const { slug } = req.params;
  const { title, amount, category, note, spentAt } = req.body;
  const paramsToUpdate = {};

  if (title) {
    paramsToUpdate.title = title;
  }

  if (amount) {
    paramsToUpdate.amount = amount;
  }

  if (category) {
    paramsToUpdate.category = category;
  }

  if (note) {
    paramsToUpdate.note = note;
  }

  if (spentAt) {
    paramsToUpdate.spentAt = spentAt;
  }

  const updatedExpense = await ExpenseService.update({
    slug,
    params: paramsToUpdate,
  });

  if (updatedExpense) {
    res.send(updatedExpense);

    return;
  }

  res.sendStatus(404);
};

const remove = async(req, res) => {
  const { slug } = req.params;
  const expense = await ExpenseService.remove({ slug });

  if (expense) {
    res.status(204);

    return;
  }

  res.sendStatus(404);
};

module.exports = {
  get,
  getBySlug,
  create,
  update,
  remove,
};
