const expenseService = require('../services/expenseService');
const userService = require('../services/userService');

module.exports = {
  async getAll(req, res) {
    const { userId, categories, from, to } = req.query;
    const numberUserId = parseInt(userId);

    const expenses = await expenseService.getAllFiltered({
      userId: numberUserId,
      categories,
      from,
      to,
    });

    res.status(200).send(expenses.map(expenseService.format));
  },
  async getOne(req, res) {
    const id = parseInt(req.params.id);

    const expense = await expenseService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(expenseService.format(expense));
  },
  async create(req, res) {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const foundUser = await userService.getById(userId);

    if (!userId || !spentAt || !title || !amount || !category || !foundUser) {
      res.sendStatus(400);

      return;
    }

    const expense = await expenseService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).send(expenseService.format(expense));
  },
  async update(req, res) {
    const currentId = parseInt(req.params.id);
    const { id, userId, spentAt, title, amount, category, note } = req.body;

    const foundExpense = await expenseService.getById(currentId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!id && !userId && !spentAt && !title && !amount && !category && !note) {
      res.sendStatus(400);

      return;
    }

    await expenseService.update({
      currentId,
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    const updatedExpense = await expenseService.getById(id ?? currentId);

    res.status(200).send(expenseService.format(updatedExpense));
  },
  async remove(req, res) {
    const id = parseInt(req.params.id);

    const foundExpense = await expenseService.getById(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    await expenseService.remove(id);

    res.sendStatus(204);
  },
};
