const expensesHelpers = require('../helpers/expense.helpers');
const expensesService = require('../services/expense.service');
const { ERRORS } = require('../utils/errors');

const create = async (req, res) => {
  try {
    const requestData = {
      ...req.body,
      category: req.body.category || 'Other',
    };

    if (!expensesHelpers.checkUserExist(requestData.userId, res)) {
      return res.status(400).send(ERRORS.userNotFound);
    }

    const validateError = expensesHelpers.validateRequestData(requestData);

    if (validateError) {
      return res.status(400).send(validateError);
    }

    const expense = await expensesService.create(requestData);

    res.status(201).send(expense);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const get = async (req, res) => {
  try {
    const expenses = await expensesService.getExpenses(req.query);

    res.send(expenses);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send(ERRORS.expenseNotFound);
    }

    res.send(expense);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send(ERRORS.expenseNotFound);
    }

    await expensesService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send(ERRORS.expenseNotFound);
    }

    if (typeof title !== 'string') {
      return res.sendStatus(400);
    }

    const updatedExpense = await expensesService.update({ id, title });

    res.send(updatedExpense);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

module.exports = {
  create,
  get,
  getOne,
  update,
  remove,
};
