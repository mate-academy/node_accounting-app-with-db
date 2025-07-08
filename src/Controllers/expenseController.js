const expenseService = require('../Services/expenseService');
const userService = require('../Services/userService');

const expenseController = {
  async getMany(req, res) {
    const userId = req.query.userId ? Number(req.query.userId) : null;
    const categories = req.query.categories
      ? Array.isArray(req.query.categories)
        ? req.query.categories
        : [req.query.categories]
      : [];
    const from = req.query.from || new Date(0);
    const to = req.query.to || new Date();

    res.json(await expenseService.getMany(userId, categories, from, to));
  },

  async getById(req, res) {
    if (!req.params.id) {
      return res.sendStatus(400);
    }

    const expense = await expenseService.getById(Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  },

  async create(req, res) {
    if (
      !req.body ||
      !req.body.userId ||
      !(await userService.getById(Number(req.body.userId))) ||
      !req.body.spentAt ||
      Date(req.body.spentAt) === 'Invalid Date' ||
      !req.body.title ||
      !req.body.amount ||
      !req.body.category
    ) {
      return res.sendStatus(400);
    }

    const expenseData = {
      ...req.body,
      userId: Number(req.body.userId),
      note: req.body.note || null,
    };

    res.status(201).json(await expenseService.create(expenseData));
  },

  async update(req, res) {
    if (!req.body || !req.params.id) {
      return res.sendStatus(400);
    }

    if (!(await expenseService.getById(Number(req.params.id)))) {
      return res.sendStatus(404);
    }
    await expenseService.update(Number(req.params.id), req.body);

    res.status(200).json(await expenseService.getById(Number(req.params.id)));
  },

  async delete(req, res) {
    if (!(await expenseService.getById(Number(req.params.id)))) {
      return res.sendStatus(404);
    }
    await expenseService.delete(Number(req.params.id));
    res.sendStatus(204);
  },
};

module.exports = expenseController;
