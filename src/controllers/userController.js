const userService = require('../services/userService');
const expenseService = require('../services/expenseService');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.status(200).json(users);
};

const getById = async (req, res) => {
  const user = await userService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.create({ name });

  res.status(201).json(user);
};

const remove = async (req, res) => {
  const user = await userService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const expenses = await expenseService.getAll();
  const userExpenses = expenses.filter((e) => e.userId === user.id);

  await Promise.all(userExpenses.map((e) => expenseService.remove(e.id)));

  await userService.remove(user.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const user = await userService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await userService.update({
    id: user.id,
    name: req.body.name !== undefined ? req.body.name : user.name,
  });

  res.status(200).json(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
