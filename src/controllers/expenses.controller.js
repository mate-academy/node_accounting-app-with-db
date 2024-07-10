const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_CREATED = 201;

const get = async (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;
    const all = await expensesService.getAll(+userId, categories, from, to);

    return res.status(HTTP_OK).send(all);
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(HTTP_BAD_REQUEST).send();
    }

    const expense = await expensesService.getOneExpense(+id);

    if (!expense) {
      return res.status(HTTP_NOT_FOUND).send();
    } else {
      return res.status(HTTP_OK).send(expense);
    }
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

const deleting = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expensesService.getOneExpense(+id);

    if (expense) {
      await expensesService.deletingExpense(+id);

      return res.status(HTTP_NO_CONTENT).send();
    } else {
      return res.status(HTTP_NOT_FOUND).send();
    }
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

const patch = async (req, res) => {
  try {
    const { id } = req.params;
    const expData = req.body;

    if (!id || !expData) {
      return res.status(HTTP_BAD_REQUEST).send();
    }

    const updated = await expensesService.updateExpense(+id, expData);

    if (updated) {
      return res.status(HTTP_OK).json(updated);
    } else {
      return res.status(HTTP_NOT_FOUND).send();
    }
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

const post = async (req, res) => {
  try {
    const expData = req.body;
    const user = await usersService.getUser(expData.userId);

    if (!user) {
      return res.status(HTTP_BAD_REQUEST).send();
    }

    const created = await expensesService.createExpense(expData);

    return res.status(HTTP_CREATED).send(created);
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

module.exports = {
  get,
  getOne,
  deleting,
  patch,
  post,
};
