const expensesService = require('../services/expense.service');
const expensesHelpers = require('../helpers/expense.helpers');
const userHelpers = require('../helpers/user.helpers');
const {
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
} = require('../constants/code.statuses');
const get = async (req, res) => {
  const expenses = await expensesService.getExpenses(req.query);

  res.send(expenses.map((expense) => expensesHelpers.normalize(expense)));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (await expensesHelpers.isExpenseExist(id)) {
    res.status(NOT_FOUND).send('Expense with this id not found');

    return;
  }

  const expense = await expensesService.getExpenseById(id);

  res.send(expensesHelpers.normalize(expense));
};

const create = async (req, res) => {
  if (await userHelpers.isUserExist(req.body.userId)) {
    res.status(BAD_REQUEST).send('User not found');

    return;
  }

  try {
    expensesHelpers.validateRequestBodyFields(req.body);

    const expense = await expensesService.create(req.body);

    res.statusCode = CREATED;

    res.send(expense);
  } catch (error) {
    res.status(BAD_REQUEST).send(error.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (await expensesHelpers.isExpenseExist(id)) {
    res.status(NOT_FOUND).send('Expense with this id not found');

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(NO_CONTENT);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (await expensesHelpers.isExpenseExist(id)) {
    res.status(NOT_FOUND).send('Expense with this id not found');

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const updatedExpense = await expensesService.update({
    id,
    title,
  });

  res.send(expensesHelpers.normalize(updatedExpense));
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
