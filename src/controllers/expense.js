const { expenseService, userService } = require('../service');

const create = async (req, res) => {
  const user = await userService.getById(req.body.userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const requiredKeys = ['spentAt', 'title', 'amount', 'userId'];

  const passedKeys = Object.keys(req.body);

  const hasAllKeys = requiredKeys.every((key) => passedKeys.includes(key));

  if (!hasAllKeys) {
    return res.sendStatus(400);
  }

  const newRecord = await expenseService.create(req.body);

  res.status(201).send(newRecord);
};

const getAll = async (req, res) => {
  const data = await expenseService.getAll(req.query);

  res.send(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const record = await expenseService.getById(+id);

  if (!record) {
    return res.sendStatus(404);
  }

  res.send(record);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expenseService.remove(+id);

  res.sendStatus(204);
};

const patch = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updated = await expenseService.update(+id, req.body);

  if (!updated) {
    return res.sendStatus(400);
  }

  const expenseUpdated = await expenseService.getById(+id);

  res.send(expenseUpdated);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  patch,
};
