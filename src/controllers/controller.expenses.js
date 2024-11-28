'use strict';

const { Expense } = require('../models/Expense.model');
const { Op } = require("sequelize");

async function getAll(req, res) {
  const where = req.where;

  try {
    const expenses = await Expense.findAll({
      where,
    });

    res.json(expenses.map(data => data.dataValues));
  } catch (err) {
    res.sendStatus(500);
  }
}

async function postById(req, res) {
  try {
    const dataValues = await Expense.create({ ...req.preparedData });

    res.status(201).json(dataValues);
  } catch (err) {
    res.sendStatus(500);
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

    res.json(expense);
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

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.json(expense);
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

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
}

function middlewareCheckCorrectPostData(req, res, next) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
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

  const preparedData = {
    userId,
    spentAt,
    title,
    amount,
  };

  if (typeof category === 'string') {
    preparedData.category = category;
  }

  if (typeof note === 'string') {
    preparedData.note = note;
  }

  req.preparedData = preparedData;

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

function middlewarePrepareQuery(req, res, next) {
  const where = {
    [Op.and]: []
  };

  if (req.query.userId) {
    where[Op.and].push({ userId: req.query.userId });
  }

  if (req.query.categories) {
    where[Op.and].push({ category: req.query.categories });
  }

  if (req.query.from && req.query.to) {
    where.spentAt = {
      [Op.between]: [req.query.from, req.query.to]
    };
  }

  if (where[Op.and].length === 0) {
    delete where[Op.and];
  }

  req.where = where;

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
    middlewarePrepareQuery,
  },
};
