'use strict';

const { Expense } = require('../models/Expense.model');

async function getAll(req, res) {
  try {
    const expenses = await Expense.findAll({
      order: [['id', 'DESC']],
    });

    res.send(JSON.stringify(expenses));
  } catch (err) {
    res.sendStatus(500);
  }
}

async function postById(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  try {
    const dataValues = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    });

    res.send(JSON.stringify(dataValues));
  } catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
}

async function getById(req, res) {
  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(JSON.stringify(expense.dataValues));
  } catch (err) {
    res.sendStatus(500);
  }
}

async function patchById(req, res) {
  const id = req.params.id;
  const { updatedValues } = req;

  try {
    const result = await Expense.update(
      { ...updatedValues },
      { where: { id } },
    );

    if (!result[0]) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function deleteById(req, res) {
  const id = req.params.id;

  try {
    const result = await Expense.destroy({
      where: { id },
    });

    if (!result) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

function middlewareCheckCorrectPostData(req, res, next) {
  const { userId, spentAt, title, amount, category } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.status(400).send('Invalid data');

    return;
  }

  if (typeof amount !== 'number') {
    res.status(400).send('Invalid data type amount');

    return;
  }

  if (isNaN(Date.parse(spentAt))) {
    res.status(400).send('Invalid data type spentAt');

    return;
  }

  next();
}

function middlewareCheckCorrectPatchData(req, res, next) {
  const { spentAt, title, amount, category } = req.body;

  const updatedValues = {};

  if (spentAt || !isNaN(Date.parse(spentAt))) {
    updatedValues.spentAt = spentAt;
  }

  if (title) {
    updatedValues.title = title;
  }

  if (category) {
    updatedValues.category = category;
  }

  if (amount || typeof amount === 'number') {
    updatedValues.amount = amount;
  }

  req.updatedValues = updatedValues;

  next();
}

module.exports = {
  expensesController: {
    getAll,
    postById,
    getById,
    patchById,
    deleteById,
    middlewareCheckCorrectPostData,
    middlewareCheckCorrectPatchData,
  },
};
