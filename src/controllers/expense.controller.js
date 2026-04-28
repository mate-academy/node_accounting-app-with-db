const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

class ExpenseController {
  getByFilter = async (req, res) => {
    const filteredExpenses = await expenseService.getByFilter(req.query);

    res.status(200).json(filteredExpenses);
  };

  getOne = async (req, res) => {
    const id = Number(req.params.id);
    const expense = await expenseService.getById(id);

    if (!expense) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  };

  create = async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      return res.status(400).send({ message: 'Required fields missing' });
    }

    const user = await userService.getById(userId);

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const newExpense = await expenseService.create({
      userId,
      spentAt,
      title,
      amount,
      category: category ?? '',
      note: note ?? '',
    });

    res.status(201).json(newExpense);
  };

  update = async (req, res) => {
    const id = Number(req.params.id);
    const expense = await expenseService.getById(id);

    if (!expense) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    const updatesData = req.body;

    if ('userId' in updatesData) {
      const user = await userService.getById(updatesData.userId);

      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
    }

    if ('spentAt' in updatesData) {
      const ts = Date.parse(updatesData.spentAt);

      if (!Number.isFinite(ts)) {
        return res.status(400).send({ message: 'SpentAt is required' });
      }
    }

    if ('title' in updatesData) {
      if (
        typeof updatesData.title !== 'string' ||
        updatesData.title.trim() === ''
      ) {
        return res.status(400).send({ message: 'Title is required' });
      }
    }

    if ('amount' in updatesData) {
      if (
        typeof updatesData.amount !== 'number' ||
        !Number.isFinite(updatesData.amount) ||
        updatesData.amount <= 0
      ) {
        return res.status(400).send({ message: 'Amount is required' });
      }
    }

    if ('category' in updatesData) {
      if (
        typeof updatesData.category !== 'string' ||
        updatesData.category.trim() === ''
      ) {
        return res.status(400).send({ message: 'Category is required' });
      }
    }

    if ('note' in updatesData && typeof updatesData.note !== 'string') {
      return res.status(400).send({ message: 'Note is required' });
    }

    const updatedExpenses = await expenseService.update(id, updatesData);

    res.status(200).json(updatedExpenses);
  };

  remove = async (req, res) => {
    const id = Number(req.params.id);
    const expense = await expenseService.getById(id);

    if (!expense) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    await expenseService.remove(id);
    res.sendStatus(204);
  };
}
module.exports = new ExpenseController();
