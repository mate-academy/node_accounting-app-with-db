const { getUserById } = require('../services/user.service');

const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/expense.service');

const getExpenses = async (req, res) => {
  const { from, to } = req.query;

  let result = await getAll(req.query);

  if (from) {
    const fromTime = new Date(from).getTime();

    result = result.filter(
      (exp) => new Date(exp.spentAt).getTime() >= fromTime,
    );
  }

  if (to) {
    const toTime = new Date(to).getTime();

    result = result.filter((exp) => new Date(exp.spentAt).getTime() <= toTime);
  }

  res.send(result);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

const createExpense = async (req, res) => {
  const { title, amount, category, note, userId, spentAt } = req.body;

  const isUserIdMissing = userId === undefined || userId === null;

  let userExists = false;

  if (!isUserIdMissing) {
    userExists = await getUserById(userId);
  }

  const isTitleInvalid = title === undefined || title === null;
  const isAmountInvalid = amount === undefined || amount === null;
  const isUserInvalid = isUserIdMissing || !userExists;

  if (isTitleInvalid || isAmountInvalid || isUserInvalid) {
    return res.sendStatus(400);
  }

  const newExpense = await create({
    title,
    amount,
    category,
    note,
    userId,
    spentAt,
  });

  res.status(201).send(newExpense);
};
const updateExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (req.body.title !== undefined && typeof req.body.title !== 'string') {
    return res.sendStatus(400);
  }

  const updatedExpense = await update(id, req.body);

  res.send(updatedExpense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  if (!(await getById(id))) {
    res.sendStatus(404);

    return;
  }

  await remove(id);

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOne,
  createExpense,
  updateExpense,
  removeExpense,
};
