const expensesHelpers = require('../helpers/expense.helpers');
const expensesService = require('../services/expense.service');
const {
  INTERNAL_SERVER_ERROR,
  EXPENSE_NOT_FOUND_ERROR,
} = require('../utils/config');

const create = async (req, res) => {
  try {
    const {
      userId,
      spentAt,
      title,
      amount,
      note,
      category = 'Other',
    } = req.body;

    const requestData = {
      userId,
      title,
      amount,
      category,
      note,
      res,
    };

    if (
      expensesHelpers.isUserExist(userId, res) ||
      expensesHelpers.validateRequestData(requestData)
    ) {
      return;
    }

    const expense = await expensesService.create({
      userId,
      title,
      spentAt,
      category,
      amount,
      note,
    });

    res.status(201).send(expense);
  } catch (error) {
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

const get = async (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;

    const expenses = await expensesService.getExpenses({
      userId,
      categories,
      from,
      to,
    });

    res.send(expenses);
  } catch (error) {
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send({ EXPENSE_NOT_FOUND_ERROR });
    }

    res.send(expense);
  } catch (error) {
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send({ EXPENSE_NOT_FOUND_ERROR });
    }

    await expensesService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send({ EXPENSE_NOT_FOUND_ERROR });
    }

    if (typeof title !== 'string') {
      res.sendStatus(400);

      return;
    }

    const updatedExpense = await expensesService.update({ id, title });

    res.send(updatedExpense);
  } catch (error) {
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  create,
  get,
  getOne,
  update,
  remove,
};
