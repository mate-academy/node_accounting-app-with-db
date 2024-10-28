const expenseService = require('../services/expense.service');
const { getById: getUserById } = require('../services/user.service');

const get = async (req, res) => {
  const expenses = await expenseService.getAll(req.query);

  res.send(expenses.map((expense) => expenseService.normalize(expense)));
};

const getOne = async (req, res) => {
  const expense = await req.entry;

  res.send(expenseService.normalize(expense));
};

const create = async (req, res) => {
  const {
    userId,
    spentAt = new Date(),
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = await getUserById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expenseService.normalize(expense));
};

const remove = async (req, res) => {
  const { id } = req.entry;

  await expenseService.remove(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.entry;

  await expenseService.update(id, req.body);

  const expense = await expenseService.getById(id);

  res.send(expenseService.normalize(expense));
};

module.exports = {
  getOne,
  get,
  create,
  remove,
  update,
};
