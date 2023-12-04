'use strict';

const validateQuery = require('../validation/expensesValidate');
const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const normalize = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
});

// eslint-disable-next-line space-before-function-paren
const get = async (req, res) => {
  // Use the validateQuery middleware before processing the request
  // eslint-disable-next-line space-before-function-paren
  validateQuery(req, res, async () => {
    const {
      userId,
      from,
      to,
      categories,
    } = req.query;

    let expenses = (await expensesService.getAll())
      .map(value => normalize(value));

    if (userId) {
      expenses = expenses.filter(expense => expense.userId === Number(userId));
    }

    if (categories) {
      expenses = expenses
        .filter(expense => categories.includes(expense.category));
    }

    if (from) {
      expenses = expenses
        .filter(expense => (
          new Date(expense.spentAt).valueOf() > new Date(from).valueOf())
        );
    }

    if (to) {
      expenses = expenses
        .filter(expense => (
          new Date(expense.spentAt).valueOf() < new Date(to).valueOf())
        );
    }

    res.send(expenses);
  });
};

// eslint-disable-next-line space-before-function-paren
const post = async (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!(await userService.getById(userId))) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    userId: userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  try {
    const data = await expensesService.add(newExpense);

    res.statusCode = 201;
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// eslint-disable-next-line space-before-function-paren
const getExpense = async (req, res) => {
  const { id } = req.params;
  const data = await expensesService.getById(id);

  if (!data) {
    res.sendStatus(404);

    return;
  }

  if (!id) {
    res.sendStatus(400);

    return;
  }

  res.send(data);
};

// eslint-disable-next-line space-before-function-paren
const removeExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await expensesService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

// eslint-disable-next-line space-before-function-paren
const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  res.send(await expensesService.update(id, req.body));
};

module.exports = {
  get,
  post,
  getExpense,
  removeExpense,
  updateExpense,
};
