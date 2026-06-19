const expensesServices = require('./../services/expense.service');
const userServices = require('./../services/user.service');

const get = async (req, res) => {
  const query = req.query;

  try {
    if (Object.keys(query).length > 0) {
      const expenses = await expensesServices.getByQuery(query);

      res.send(expenses);

      return;
    }

    const allExpenses = await expensesServices.get();

    res.send(allExpenses);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesServices.getOne(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!title || !spentAt || !amount || !(await userServices.getById(+userId))) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, spentAt, amount, category, note } = req.body;

  if (!(await expensesServices.getOne(+id))) {
    res.sendStatus(404);

    return;
  }

  const payload = {
    id: +id,
  };

  if (title) {
    payload.title = title;
  }

  if (spentAt) {
    payload.spentAt = spentAt;
  }

  if (amount) {
    payload.amount = amount;
  }

  if (category) {
    payload.category = category;
  }

  if (note) {
    payload.note = note;
  }

  if (Object.keys(payload).length === 1) {
    res.sendStatus(400);

    return;
  }

  await expensesServices.update(payload);

  const updatedExpense = await expensesServices.getOne(+id);

  res.send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await expensesServices.getOne(+id))) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.remove(+id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
