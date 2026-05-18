const expensesServices = require('../models/Expense.model');
const usersServices = require('../models/User.model');

const getAll = async (req, res) => {
  try {
    const data = await expensesServices.getAll(req.query);

    res.send(data.map((d) => expensesServices.normalize(d)));
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.sendStatus(400);
  }

  try {
    const expense = await expensesServices.getOne(+id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expensesServices.normalize(expense));
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.sendStatus(400);
  }

  try {
    const deleteExpense = await expensesServices.remove(+id);

    if (deleteExpense === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category = 'Category',
    note = 'Some note',
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  try {
    const user = await usersServices.getOne(+userId);

    if (!user) {
      return res.sendStatus(404);
    }

    const expense = await expensesServices.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).send(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.sendStatus(400);
  }

  try {
    const [isUpdated, updatedExpenses] = await expensesServices.update(
      +id,
      req.body,
    );

    if (isUpdated === 0) {
      return res.sendStatus(404);
    }

    res.send(expensesServices.normalize(updatedExpenses[0]));
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  getOne,
  remove,
  create,
  update,
};
