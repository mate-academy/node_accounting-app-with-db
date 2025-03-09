const service = require('./../services/expenses.service');
const usersService = require('./../services/users.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await service.getAll(userId, categories, from, to);

  res.status(200).json(expenses);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await service.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const create = async (req, res) => {
  const { userId } = req.body;

  if (!req.body) {
    return res.sendStatus(400);
  }

  const user = await usersService.getOne(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = await service.create(req.body);

  res.status(201).json(newExpense);
};

const update = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  const expense = await service.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await service.update(id, body);

  const updatedExpense = await service.getById(id);

  res.status(200).json(updatedExpense);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const expense = await service.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await service.deleteById(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
