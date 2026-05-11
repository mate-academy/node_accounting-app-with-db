/* eslint-disable curly */
const expenses = require('../entitys/expenses.reposytory.js');
const users = require('../entitys/users.reposytory.js');

const isDate = (str) => {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

  // eslint-disable-next-line curly
  if (!isoRegex.test(str)) return false;

  const date = new Date(str);

  return !isNaN(date.getTime());
};

const checkDataForUpdate = (o) => {
  return Object.keys(o).every((k) => {
    switch (k) {
      case 'spentAt':
        return isDate(o[k]);
      case 'title':
      case 'category':
      case 'note':
        return typeof o[k] === 'string';
      case 'amount':
        return typeof o[k] === 'number';
      default:
        return false;
    }
  });
};

const getAll = async (req, res) => {
  const filterOptions = { userId: 'userId', categories: 'category' };
  const filterParams = {};

  for (const key in req.query) {
    if (filterOptions[key]) filterParams[filterOptions[key]] = req.query[key];
  }

  res.send(await expenses.getAll(filterParams));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const intUserId = Number(userId);

  const userExist = !Number.isNaN(intUserId)
    ? await users.getById(intUserId)
    : null;

  if (
    !userExist ||
    !isDate(spentAt) ||
    typeof title !== 'string' ||
    typeof amount !== 'number'
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    userId: intUserId,
    spentAt,
    title,
    amount,
  };

  if (typeof note === 'string') newExpense.note = note;
  if (typeof category === 'string') newExpense.category = category;

  res.statusCode = 201;
  res.send(await expenses.create(newExpense));
};

const getById = async (req, res) => {
  const { id } = req.params;
  const intId = Number(id);

  if (Number.isNaN(intId)) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenses.getById(intId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const intId = Number(id);

  if (Number.isNaN(intId)) {
    res.sendStatus(400);

    return;
  }

  const result = await expenses.remove(intId);

  if (result <= 0) {
    res.sendStatus(404);

    return;
  }

  res.send(204);
};

const update = async (req, res) => {
  const { id } = req.params;

  const intId = Number(id);

  if (Number.isNaN(intId) || !checkDataForUpdate(req.body)) {
    res.sendStatus(400);

    return;
  }

  const [, expense] = await expenses.update(intId, req.body);

  if (!expense[0]) {
    res.sendStatus(404);

    return;
  }

  res.send(expense[0]);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
