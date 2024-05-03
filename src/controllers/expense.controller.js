const expensesService = require('../services/expense.service');
const expensesHelpers = require('../helpers/expense.helpers');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  try {
    const expenses = await expensesService.getExpenses(
      userId,
      categories,
      from,
      to,
    );

    res.send(expenses.map((expense) => expensesHelpers.normalize(expense)));
  } catch (error) {
    res.status(500).send({ error: 'Failed to get expenses try again' });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (await expensesHelpers.isExpenseExist(id, res)) {
    return;
  }

  try {
    const expense = await expensesService.getExpenseById(id);

    res.send(expensesHelpers.normalize(expense));
  } catch (error) {
    res.status(500).send({ error: 'Failed to get expense try again' });
  }
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    (await expensesHelpers.isUserExist(userId, res)) ||
    expensesHelpers.validateRequestBodyFields({
      userId,
      title,
      amount,
      category,
      res,
    })
  ) {
    return;
  }

  try {
    const expense = await expensesService.create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.statusCode = 201;

    res.send(expense);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create expense try again' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (await expensesHelpers.isExpenseExist(id, res)) {
    return;
  }

  try {
    await expensesService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: 'Failed to remove expense try again' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (await expensesHelpers.isExpenseExist(id, res)) {
    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  try {
    const updatedExpense = await expensesService.update({
      id,
      title,
    });

    res.send(expensesHelpers.normalize(updatedExpense));
  } catch (error) {
    res.status(500).send({ error: 'Failed to update expense try again' });
  }
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
