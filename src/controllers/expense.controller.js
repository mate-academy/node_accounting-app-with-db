/* eslint-disable no-console */
const expenseService = require('../services/expense.service');
const { getById: getUserById } = require('../services/user.service');

const get = async (req, res) => {
  try {
    const expenses = (await expenseService.getAll(req.query)).map(
      expenseService.normalize,
    );

    res.send(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while retrieving expenses.' });
  }
};

const getOne = (req, res) => {
  try {
    const expense = expenseService.normalize(req.entry);

    res.send(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while retrieving the expense.' });
  }
};

const create = async (req, res) => {
  try {
    const {
      userId,
      spentAt = new Date(),
      title,
      amount,
      category,
      note,
    } = req.body;

    if (!userId || !title || !amount) {
      return res.status(400).send({
        error: 'Missing required fields: userId, title, or amount.',
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(400).send({ error: 'User not found.' });
    }

    const expense = expenseService.normalize(
      await expenseService.create(
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      ),
    );

    res.status(201).send(expense);
  } catch (error) {
    console.error('Error creating expense:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while creating the expense.' });
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.entry;

    await expenseService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting expense:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while deleting the expense.' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.entry;

    await expenseService.update(id, req.body);

    const expense = expenseService.normalize(await expenseService.getById(id));

    res.send(expense);
  } catch (error) {
    console.error('Error updating expense:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while updating the expense.' });
  }
};

module.exports = {
  getOne,
  get,
  create,
  remove,
  update,
};
