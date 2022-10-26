'use strict';

const {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  createExpense,
  deleteExpense,
} = require('../Postgre/postgreExpense');
const { getUserByID } = require('../Postgre/postgreUser');

function expensePoints(app) {
  app.get('/', async(req, res) => {
    const { userId, category, from, to } = req.body;

    let getExpenses = await getAllExpenses();

    if (userId) {
      getExpenses = [...getExpenses].filter(expense => (
        expense.userId === userId
      ));
    }

    if (category) {
      getExpenses = [...getExpenses].filter(expense => (
        category.includes(expense.category)
      ));
    }

    if (from && to) {
      getExpenses = [...getExpenses].filter(expense => (
        new Date(from) < new Date(expense.spentAt)
        && new Date(to) > new Date(expense.spentAt)
      ));
    }

    res
      .status(200)
      .send(getExpenses.length === 0 ? [] : getExpenses);
  });

  app.get('/:id', async(req, res) => {
    const { id } = req.params;
    const foundedExpense = await getExpenseById(id);

    if (!id) {
      res
        .status(400)
        .send('ID of expense is requered');

      return;
    }

    if (!foundedExpense) {
      res
        .status(404)
        .send('Expenses is not found');

      return;
    }

    res
      .status(200)
      .send(foundedExpense);
  });

  app.patch('/:id', async(req, res) => {
    const { id } = req.params;
    const newExpense = await getExpenseById(id);

    if (!id) {
      res
        .status(400)
        .send('ID of expense is requered');

      return;
    }

    if (!newExpense.length) {
      res
        .status(404)
        .send('Expense is not found');

      return;
    }

    const {
      userid,
      amount,
      category,
      note,
      title,
    } = req.body;

    const updatedKeys = {
      userid,
      amount,
      category,
      note,
      title,
    };

    await updateExpense(newExpense[0], updatedKeys);

    res
      .status(200)
      .send(newExpense);
  });

  app.post('/', async(req, res) => {
    const {
      userid,
      amount,
      category,
      note,
      title,
    } = req.body;

    const foundedUser = await getUserByID(userid);

    if (!foundedUser.length) {
      res
        .status(400)
        .send('User is not provided');

      return;
    }

    const newExpense = await createExpense(
      userid,
      amount,
      category,
      note,
      title,
    );

    res
      .status(201)
      .send(newExpense);
  });

  app.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const deletedExpense = await getExpenseById(id);

    if (!deletedExpense.length) {
      res
        .status(404)
        .send('Expense is not found');

      return;
    }

    await deleteExpense(id);

    res
      .sendStatus(204);
  });
}
module.exports = { expensePoints };
