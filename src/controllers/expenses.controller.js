const expensesService = require('../services/expenses.service');
const isValidExpense = require('../isValidExpense');

async function getExpenses(req, res) {
  const searchParams = new URLSearchParams(req.url.split('?')[1]);

  const userId = searchParams.get('userId');
  const category = searchParams.get('categories');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  res.send(await expensesService.getSortedExpenses(userId, category, from, to));
}

async function getExpense(req, res) {
  try {
    const id = req.params.id;
    const response = await expensesService.getOne(id);

    if (response) {
      res.send(response);

      return;
    }

    res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function createExpense(req, res) {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!(await isValidExpense.isValid(req.body))) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    res.statusCode = 201;
    res.send(await expensesService.create(expense));
  } catch (error) {
    res.sendStatus(500);
  }
}

async function updateExpense(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    let expenseToUpdate;

    try {
      expenseToUpdate = await expensesService.getOne(id);

      if (!expenseToUpdate.dataValues) {
        throw Error;
      }
    } catch (error) {
      res.sendStatus(404);

      return;
    }

    const newExpense = {
      ...expenseToUpdate.dataValues,
      ...data,
    };

    res.send(await expensesService.update(id, newExpense));
  } catch (error) {
    res.sendStatus(500);
  }
}

async function deleteExpense(req, res) {
  try {
    const id = req.params.id;

    try {
      const deletedUser = await expensesService.getOne(id);

      if (!deletedUser.dataValues.id) {
        throw Error;
      }
    } catch (error) {
      res.sendStatus(404);

      return;
    }

    expensesService.deleteOne(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

module.exports = {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpense,
};
