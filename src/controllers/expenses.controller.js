const { STATUS } = require('../utils/statusCodes');
const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.status(STATUS.OK).send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const expense = await expensesService.getOneById(id);

  if (!expense) {
    res
      .status(STATUS.NOT_FOUND)
      .send(`The expense with ${id} ID does not exist.`);

    return;
  }

  res.status(STATUS.OK).send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount } = req.body;
  const user = await usersService.getOneById(userId);

  if (
    !user ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number'
  ) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const expense = await expensesService.create(req.body);

  res.status(STATUS.CREATED).send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const expense = await expensesService.getOneById(id);

  if (!expense) {
    res
      .status(STATUS.NOT_FOUND)
      .send(`The expense with ${id} ID does not exist.`);

    return;
  }

  await expensesService.remove(id);

  res
    .status(STATUS.NO_CONTENT)
    .send(`The expense with ${id} ID was successfully deleted.`);
};

const update = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const expense = await expensesService.update(id, req.body);

  if (!expense) {
    res
      .status(STATUS.NOT_FOUND)
      .send(`The expense with ${id} ID does not exist.`);

    return;
  }

  res.status(STATUS.OK).send(expense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
