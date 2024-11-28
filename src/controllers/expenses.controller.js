const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

class ExpensesController {
  getAllExpenses = async (req, res) => {
    try {
      res.send(await expensesService.getAll(req.query));
    } catch {
      res.status(500).send('Failed to get expenses');
    }
  };
  createExpense = async (req, res) => {
    const { userId } = req.body;

    try {
      const user = await usersService.getById(userId);

      if (!user) {
        res.sendStatus(400);

        return;
      }

      return res.status(201).send(await expensesService.create(req.body));
    } catch {
      res.status(500).send('Failed to create expense');
    }
  };
  getExpense = async (req, res) => {
    const { id } = req.params;

    try {
      const expense = await expensesService.getById(id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      res.send(expense);
    } catch {
      res.status(500).send('Failed to get expense');
    }
  };
  updateExpense = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const expense = await expensesService.getById(id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      res.send(await expensesService.update(id, data));
    } catch {
      res.status(500).send('Failed to update expense');
    }
  };
  deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
      const expense = await expensesService.getById(id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      await expensesService.delete(id);
      res.sendStatus(204);
    } catch {
      res.status(500).send('Failed to delete expense');
    }
  };
}

const expensesController = new ExpensesController();

module.exports = { expensesController };
