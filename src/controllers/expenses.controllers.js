function createExpensesController(expensesService, usersService) {
  async function getAll(req, res) {
    const { userId, from, to, categories } = req.query;

    const result = await expensesService.getAll({
      userId,
      from,
      to,
      categories,
    });

    res.json(result);
  }

  async function getById(req, res) {
    const { id } = req.params;
    const expense = await expensesService.getById({ id });

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  }

  async function create(req, res) {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = await usersService.getById(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    if (
      typeof title !== 'string' ||
      title.trim() === '' ||
      typeof amount !== 'number'
    ) {
      return res.sendStatus(400);
    }

    const expense = await expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  }

  async function update(req, res) {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    const expense = await expensesService.update({
      id: +id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).json(expense);
  }

  async function remove(req, res) {
    const { id } = req.params;

    if (!expensesService.getById({ id })) {
      return res.sendStatus(404);
    }

    await expensesService.remove({ id });
    res.sendStatus(204);
  }

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
}

module.exports = { createExpensesController };
