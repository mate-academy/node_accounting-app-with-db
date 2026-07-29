const expensesService = require('../services/expenses.service');

class ExpenseController {
  async getAll(req, res) {
    const { userId, categories, from, to } = req.query;
    let query = {
      userId,
      categories,
      from,
      to,
    };

    for (const key in query) {
      if (query[key] === undefined) {
        delete query[key];
      }
    }

    if (Object.keys(query).length === 0) {
      query = null;
    }

    /* eslint-disable comma-dangle, prettier/prettier */
    const expenses = (await expensesService.getAll(query)).map((expense) =>
      expensesService.normalize(expense),);
    /* eslint-enable comma-dangle, prettier/prettier */

    return res.json(expenses);
  }

  async getById(req, res) {
    const expenseId = Number(req.params.id);

    if (!(expenseId >= 0)) {
      return res.sendStatus(400);
    }

    const expense = await expensesService.getById(expenseId);

    if (!expense) {
      return res.sendStatus(404);
    }

    return res.json(expensesService.normalize(expense));
  }

  async create(req, res) {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const expense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    if (
      Object.entries(expense).some(
        (entry) =>
          ['userId', 'spentAt', 'title', 'amount'].includes(entry[0]) &&
          entry[1] === undefined,
      )
    ) {
      return res.sendStatus(400);
    }

    const newExpense = await expensesService.create(expense);

    if (!newExpense) {
      return res.sendStatus(400);
    }

    res.status(201).json(expensesService.normalize(newExpense));
  }

  async deleteById(req, res) {
    const affectedRows = await expensesService.deleteById(
      Number(req.params.id),
    );

    if (affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }

  async update(req, res) {
    const id = Number(req.params.id);
    const fields = ['spentAt', 'title', 'amount', 'category', 'note'];
    const updateExpense = {};
    let queryHasFields = false;

    for (const key of fields) {
      if (req.body[key] !== undefined) {
        updateExpense[key] = req.body[key];
        queryHasFields = true;
      }
    }

    if (!queryHasFields) {
      return res.sendStatus(404);
    }

    const expense = await expensesService.update(id, updateExpense);

    if (!expense) {
      return res.sendStatus(404);
    }

    return res.send(expensesService.normalize(expense));
  }
}

module.exports = new ExpenseController();
