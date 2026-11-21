function createExpensesController(ExpensesService, UsersService) {
  return {
    getAllExpenses: async (req, res) => {
      const { userId, categories, from, to } = req.query;

      const categoryList = categories ? categories.split(',') : [];

      const invalidDate = [from, to].some(
        (value) => value && !Number.isFinite(Date.parse(value)),
      );

      if (invalidDate || (from && to && Date.parse(from) > Date.parse(to))) {
        return res.sendStatus(400);
      }

      try {
        const expens = await ExpensesService.getAllExpenses(
          userId,
          categoryList,
          from,
          to,
        );

        res.statusCode = 200;
        res.send(expens);
      } catch {
        res.sendStatus(404);
      }
    },

    createExpenses: async (req, res) => {
      const { userId, spentAt, title, amount, category, note } = req.body;

      if (
        userId === undefined ||
        userId === null ||
        !spentAt ||
        !title ||
        amount === undefined ||
        amount === null
      ) {
        res.sendStatus(400);

        return;
      }

      try {
        await UsersService.getUserById(userId);
      } catch {
        res.sendStatus(400);

        return;
      }

      try {
        res.statusCode = 201;

        const user = await ExpensesService.createExpenses(
          userId,
          spentAt,
          title,
          amount,
          category,
          note,
        );

        res.send(user);
      } catch {
        res.sendStatus(500);
      }
    },

    getExpensesById: async (req, res) => {
      const { id } = req.params;

      if (!id) {
        res.sendStatus(400);

        return;
      }

      try {
        const expenses = await ExpensesService.getExpensesById(id);

        res.statusCode = 200;
        res.send(expenses);
      } catch {
        res.sendStatus(404);
      }
    },

    updateExpensesById: async (req, res) => {
      const { id } = req.params;

      if (!id) {
        return res.sendStatus(400);
      }

      try {
        await ExpensesService.getExpensesById(id);
      } catch {
        return res.sendStatus(404);
      }

      const fields = ['spentAt', 'title', 'amount', 'category', 'note'];
      const updates = Object.fromEntries(
        fields
          .filter((field) => req.body[field] !== undefined)
          .map((field) => [field, req.body[field]]),
      );

      if (Object.keys(updates).length === 0) {
        return res.sendStatus(400);
      }

      try {
        const updatedExpenses = await ExpensesService.updateExpensesById(
          id,
          updates,
        );

        res.status(200).send(updatedExpenses);
      } catch {
        res.sendStatus(404);
      }
    },

    deleteExpensesById: async (req, res) => {
      const { id } = req.params;

      if (!id) {
        res.sendStatus(400);

        return;
      }

      try {
        await ExpensesService.deleteExpensesById(id);
        res.statusCode = 204;
        res.end();
      } catch {
        res.sendStatus(404);
      }
    },
  };
}

module.exports = {
  createExpensesController,
};
