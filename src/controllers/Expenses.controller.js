const {
  postExpenses,
  getAllExpenses,
  getExpenses,
  deleteExpenses,
  patchExpenses,
} = require('../services/Expenses.services');
const { getUser } = require('../services/User.services');
const {
  BAD_REQUEST,
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
} = require('../statusCodes/statusCodes');

const createExpensesController = async (req, res) => {
  const { title, userId } = req.body;

  if (!title || !(await getUser(userId))) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  res.status(CREATED).send(await postExpenses(req.body));
};

const getExpensesController = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.status(OK).send(await getAllExpenses(userId, categories, from, to));
};

const getExpensesByIdController = async (req, res) => {
  const { id } = req.params;

  if (!(await getExpenses(id)) || !id) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(OK).send(await getExpenses(id));
};

const deleteExpensesController = async (req, res) => {
  const { id } = req.params;

  if (!(await getExpenses(id))) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(NO_CONTENT).send(await deleteExpenses(id));
};

const updateExpensesController = async (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!(await getExpenses(id))) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(OK).send(await patchExpenses(id, newExpense));
};

module.exports = {
  createExpensesController,
  updateExpensesController,
  deleteExpensesController,
  getExpensesByIdController,
  getExpensesController,
};
