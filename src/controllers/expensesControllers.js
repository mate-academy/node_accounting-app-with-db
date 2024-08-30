const expensesServices = require('../services/expensesServices');
const usersServices = require('../services/usersServices');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  try {
    const expenses = await expensesServices.getExpenses(
      userId,
      categories,
      from,
      to,
    );

    return res.status(200).send(expenses);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const selectedExpense = await expensesServices.getOneExpense(id);

    if (!selectedExpense) {
      return res.status(404).send('err');
    }

    return res.status(200).send(selectedExpense);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const isFound = await expensesServices.getOneExpense(id);

    if (!isFound) {
      return res.status(404).send();
    }

    await expensesServices.removeExpense(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).send(error);
  }
};

const post = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  try {
    const selectedUser = await usersServices.getOneUser(userId);

    if (!spentAt || !title || !amount || !category || !selectedUser) {
      return res.status(400).send();
    }

    const newExpense = await expensesServices.createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    return res.status(201).send(newExpense);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const patch = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  try {
    const selectedExpense = await expensesServices.getOneExpense(id);

    if (!selectedExpense) {
      return res.status(404).send();
    }

    const updatedExpense = await expensesServices.updateExpense(id, {
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return res.status(200).send(updatedExpense);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  get,
  getOne,
  remove,
  patch,
  post,
};
