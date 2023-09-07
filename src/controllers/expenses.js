'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/expensesServices.js');
const { getById: getByUserId } = require('../services/usersServices.js');

async function getExpenses(req, res) {
  const body = req.query;
  const expenses = await getAll();
  const keysBody = Object.keys(body);

  if (keysBody.length > 0) {
    const filteredExpenses = expenses.filter(expense => {
      return keysBody.every(key => {
        switch (key) {
          case 'userId':
            return expense.userId === +body.userId;
          case 'categories':
            return expense.category === body.categories;
          case 'from':
            const fromDate = new Date(body.from);

            return new Date(expense.spentAt) >= fromDate;
          case 'to':
            const toDate = new Date(body.to);

            return new Date(expense.spentAt) <= toDate;
          default:
            return true;
        }
      });
    });

    res.status(200).send(filteredExpenses);
  }

  res.status(200).send(expenses);
};

async function createExpense(req, res) {
  const { userId, amount, category, note, title } = req.body;
  const foundUser = await getByUserId(userId);

  if (!foundUser || !amount || !category || !note || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpences = await create({
    userId, amount, category, note, title,
  });

  res.status(201).send(newExpences);
};

async function getExpense(req, res) {
  const { id } = req.params;

  const foundExpenses = await getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpenses);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const foundExpenses = getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  remove(id);
  res.sendStatus(204);
};

async function updateExpense(req, res) {
  const { id } = req.params;

  const foundExpenses = await getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  const reqBody = req.body;

  if (Object.keys(reqBody).length === 0) {
    res.sendStatus(400);

    return;
  }

  await update(reqBody, id);

  res.status(200).send(await getById(id));
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
