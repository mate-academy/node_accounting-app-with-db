const expensesServices = require('./expenses.services');

/* eslint-disable max-len */

// I decided not to validate date in query params not to overcomplicate the code

const filterAll = (query, value, array) => {
  switch (query) {
    case 'userId': {
      if (!array.some((expense) => expense.userId === +value)) {
        return 'No matches found';
      }

      return array.filter((expense) => expense.userId === +value);
    }

    case 'categories': {
      for (const category of value) {
        if (!expensesServices.categories.includes(category)) {
          return `The "${category}" category is not valid`;
        }

        if (!array.some((expense) => expense.category === category)) {
          return 'No matches found';
        }
      }

      return array.filter((expense) => value.includes(expense.category));
    }

    case 'from': {
      if (
        !array.some((expense) => new Date(expense.spentAt) > new Date(value))
      ) {
        return 'No matches found';
      }

      return array.filter(
        (expense) => new Date(expense.spentAt) > new Date(value),
      );
    }

    case 'to': {
      if (
        !array.some((expense) => new Date(expense.spentAt) < new Date(value))
      ) {
        return 'No matches found';
      }

      return array.filter(
        (expense) => new Date(expense.spentAt) < new Date(value),
      );
    }

    default:
      return array;
  }
};

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = await expensesServices.getAll();

  if (userId) {
    expenses = filterAll('userId', userId, expenses);
  }

  if (categories) {
    expenses = filterAll('categories', categories, expenses);
  }

  if (from) {
    expenses = filterAll('from', from, expenses);
  }

  if (to) {
    expenses = filterAll('to', to, expenses);
  }

  res.send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesServices.getOne(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const expense = req.body;

  if (errorFound(req)) {
    res.status(400).send(errorFound(req));

    return;
  }

  const createdExpense = expensesServices.create(expense);

  res.status(201).send(createdExpense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = await expensesServices.getOne(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (errorFound(req)) {
    res.status(400).send(errorFound(req));

    return;
  }

  await expensesServices.update(body, id);

  const updatedExpense = await expensesServices.getOne(+id);

  res.send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesServices.getOne(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.remove(+id);

  res.status(204).send('The expense was removed');
};

const errorFound = (req) => {
  const body = req.body;

  // note is optional so we don't check whether it was passed
  if (
    !body.userId ||
    !body.spentAt ||
    !body.title ||
    !body.amount ||
    !body.category
  ) {
    return 'Not all the paramaters were entered';
  }

  if (!expensesServices.categories.includes(body.category)) {
    return 'Incorrect category was entered';
  }

  return '';
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
