const {
  getAllExpenses,
  getExpenses,
  createExpenses,
  removeExpenses,
  updateExpenses,
} = require('../services/expenses.service');
const { getUser } = require('../services/user.service');

const getAll = async (req, res) => {
  const request = {
    userId: req.query.userId ? +req.query.userId : null,
    categories: req.query.categories ? req.query.categories : null,
    from: req.query.from ? req.query.from : null,
    to: req.query.to ? req.query.to : null,
  };

  const expensess = await getAllExpenses(request);

  if (expensess.length === 0) {
    return res.send([]);
  }

  res.send(expensess);
};

const get = async (req, res) => {
  const expenses = await getExpenses(req.params.id);

  if (!expenses) {
    return res.status(404).end();
  }

  res.send(expenses);
};

const create = async (req, res) => {
  const user = await getUser(+req.body.userId);

  if ((!req.body.title && !req.body.note) || !user) {
    return res.status(400).end();
  }

  const expenses = await createExpenses(req.body);

  if (!expenses) {
    return res.status(400).end();
  }

  res.status(201).send(expenses);
};

const remove = async (req, res) => {
  const expenses = await removeExpenses(req.params.id);

  if (!expenses) {
    return res.status(404).end();
  }

  res.status(204).end();
};

const update = async (req, res) => {
  const expenses = await updateExpenses(req.params.id, req.body);

  if (!expenses) {
    return res.status(404).end();
  }

  res.send(expenses);
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
