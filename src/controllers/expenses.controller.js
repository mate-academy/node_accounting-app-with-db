const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = async (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;
    const all = await expensesService.getAll(+userId, categories, from, to);

    return res.status(200).send(all);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send();
    }

    const expense = await expensesService.getOneExpense(+id);

    if (!expense) {
      return res.status(404).send();
    } else {
      return res.status(200).send(expense);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const deleting = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expensesService.getOneExpense(+id);

    if (expense) {
      await expensesService.deletingExpense(+id);

      return res.status(204).send();
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const patch = async (req, res) => {
  try {
    const { id } = req.params;
    const expData = req.body;

    if (!id || !expData) {
      return res.status(400).send();
    }

    const updated = await expensesService.updateExpense(+id, expData);

    if (updated) {
      return res.status(200).json(updated);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const post = async (req, res) => {
  try {
    const expData = req.body;
    const user = await usersService.getUser(expData.userId);

    if (!user) {
      return res.status(400).send();
    }

    const created = await expensesService.createExpense(expData);

    return res.status(201).send(created);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  get,
  getOne,
  deleting,
  patch,
  post,
};
