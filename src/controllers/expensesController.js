const expensesService = require('../services/expensesService');
const expensesHelpers = require('../helpers/expense.helper');
const userHelpers = require('../helpers/user.helper');
const STATUS_CODE = require('../utils/statusCodes');

const getAll = async (req, res) => {
  const expenses = await expensesService.getExpenses(req.query);

  res
    .status(STATUS_CODE.SUCCESS)
    .send(expenses.map((expense) => expensesHelpers.normalize(expense)));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (await expensesHelpers.isExpenseExist(id)) {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .send('Expense with such id not found');
  }

  const expense = await expensesService.getExpenseById(id);

  res.status(STATUS_CODE.SUCCESS).send(expensesHelpers.normalize(expense));
};

const create = async (req, res) => {
  if (await userHelpers.isUserExist(req.body.userId)) {
    return res.status(STATUS_CODE.BAD_REQUEST).send('User not found');
  }

  try {
    expensesHelpers.validateRequestBodyFields(req.body);

    const expense = await expensesService.create(req.body);

    res.statusCode = STATUS_CODE.CREATED;

    res.send(expense);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST).send(error.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (await expensesHelpers.isExpenseExist(id)) {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .send('Expense with such id not found');
  }

  await expensesService.remove(id);
  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (await expensesHelpers.isExpenseExist(id)) {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .send('Expense with such id not found');
  }

  if (typeof title !== 'string') {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const updatedExpense = await expensesService.update({ id, title });

  res
    .status(STATUS_CODE.SUCCESS)
    .send(expensesHelpers.normalize(updatedExpense));
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
