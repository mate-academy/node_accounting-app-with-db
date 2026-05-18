const expensesService = require('../service/expenses.service');
const userService = require('../service/user.service');

const get = async (req, res) => {
  const expensess = await expensesService.getAll();

  res.send(expensess.map((expenses) => expensesService.normalize(expenses)));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const expenses = await expensesService.getById(id);

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expensesService.normalize(expenses));
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expenses = expensesService.getById(id);

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedNumber = await expensesService.update(id, req.body);

  if (!updatedNumber) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.getById(id);

  res.json(updatedExpense);
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
