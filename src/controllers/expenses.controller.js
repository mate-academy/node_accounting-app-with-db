function createExpensesController(expensesService) {
  function normalize({ id, userId, spentAt, title, amount, category, note }) {
    return {
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };
  }

  return {
    async getAll(req, res) {
      const expenses = await expensesService.getAll(req.query);

      res.json(expenses.map(normalize));
    },

    async getById(req, res) {
      const expense = await expensesService.getById(+req.params.id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      res.status(200).json(normalize(expense));
    },

    async create(req, res) {
      const { userId, spentAt, title, amount, category, note } = req.body;

      if (
        userId === undefined ||
        spentAt === undefined ||
        title === undefined ||
        amount === undefined
      ) {
        res.sendStatus(400);

        return;
      }

      const expense = await expensesService.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      if (!expense) {
        res.sendStatus(400);

        return;
      }

      res.status(201).json(expense);
    },

    async remove(req, res) {
      const expense = await expensesService.deleteById(+req.params.id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      res.sendStatus(204);
    },

    async fullUpdate(req, res) {
      const { userId, spentAt, title, amount, category, note } = req.body;
      const expense = await expensesService.getById(+req.params.id);

      if (!expense) {
        return res.sendStatus(404);
      }

      if (
        userId === undefined ||
        spentAt === undefined ||
        title === undefined ||
        amount === undefined
      ) {
        res.sendStatus(400);

        return;
      }

      const updatedExpense = await expensesService.fullUpdateById({
        id: +req.params.id,
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      res.status(200).json(normalize(updatedExpense));
    },

    async partUpdate(req, res) {
      const { userId, spentAt, title, amount, category, note } = req.body;
      const expense = await expensesService.getById(+req.params.id);

      if (!expense) {
        return res.sendStatus(404);
      }

      if (
        userId === undefined &&
        spentAt === undefined &&
        title === undefined &&
        amount === undefined &&
        category === undefined &&
        note === undefined
      ) {
        res.sendStatus(400);

        return;
      }

      const updatedExpense = await expensesService.partUpdateById({
        id: +req.params.id,
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      res.status(200).json(normalize(updatedExpense));
    },
  };
}

module.exports = {
  createExpensesController,
};
