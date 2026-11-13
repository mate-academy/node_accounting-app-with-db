const expresesService = require('../srvices/expenses.service.js');
const userService = require('../srvices/users.service.js');

const getAll = async (req, res) => {
  const expense = await expresesService.getAll(req.query);

  res.send(expense);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expresesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
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

  const expense = await expresesService.create({
    spentAt,
    title,
    amount,
    userId,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expresesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expresesService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expense = await expresesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expresesService.update({
    id,
    body: {
      spentAt,
      title,
      amount,
      category,
      note,
    },
  });

  const updatedExpense = await expresesService.getById(id);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
