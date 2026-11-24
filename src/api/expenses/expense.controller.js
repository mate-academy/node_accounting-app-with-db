const expensesService = require('./expense.service.js');
const usersService = require('../users/users.service.js');

const getAll = async (req, res) => {
  try {
    const expenses = await expensesService.getAll(req.query);

    res.json(expenses);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  try {
    const expense = await expensesService.getOne(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  } catch (err) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  if (!isValidParams(req.body)) {
    return res.sendStatus(400);
  }

  const { title, amount, category, userId, note, spentAt } = req.body;

  try {
    const user = await usersService.getOne(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = await expensesService.create({
      userId,
      title,
      amount,
      category,
      note,
      spentAt,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.sendStatus(500);
  }
};

const deleteOne = async (req, res) => {
  try {
    const expense = await expensesService.getOne(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expensesService.deleteById(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

const update = async (req, res) => {
  try {
    const expense = await expensesService.getOne(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    if (!req.body || !isValidParams(req.body, true)) {
      return res.sendStatus(400);
    }

    if (req.body.userId) {
      const user = await usersService.getOne(req.body.userId);

      if (!user) {
        return res.sendStatus(400);
      }
    }

    const updatedExpense = await expensesService.update(
      req.params.id,
      req.body,
    );

    res.json(updatedExpense);
  } catch (err) {
    res.sendStatus(500);
  }
};

const isValidParams = (params, isUpdate = false) => {
  if (!params) {
    return false;
  }

  const { title, amount, category, userId, note, spentAt } = params;

  if (isUpdate) {
    return Boolean(title || amount || category || userId || note);
  }

  return Boolean(title && amount && userId && spentAt);
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
