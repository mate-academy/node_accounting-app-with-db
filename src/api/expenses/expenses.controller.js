const { expensesService } = require('../../services/expenses/expenses.service');
const { usersService } = require('../../services/users/users.service');

const getAll = async (req, res) => {
  try {
    const expenses = await expensesService.getAll(req.query);

    res.send(expenses);
  } catch (error) {
    res.status(500).send('Please try later.');
  }
};

const create = async (req, res) => {
  try {
    const {
      userId,
      spentAt,
      title,
      amount,
      category = null,
      note = null,
    } = req.body;

    const user = await usersService.getById(userId);

    if (!user) {
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

    res.status(201).send(expense);
  } catch (error) {
    res.status(500).send('Please try later.');
  }
};

const getById = async (req, res) => {
  try {
    const expense = await expensesService.getById(+req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  } catch (error) {
    res.status(500).send('Please try later.');
  }
};

const remove = async (req, res) => {
  try {
    const id = +req.params.id;
    const expense = await expensesService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expensesService.deleteById(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Please try later.');
  }
};

const update = async (req, res) => {
  try {
    const id = +req.params.id;
    const expense = await expensesService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const { userId, spentAt, title, amount, category, note } = req.body;
    const updatedExpense = await expensesService.update(id, {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.send(updatedExpense);
  } catch (error) {
    res.status(500).send('Please try later.');
  }
};

module.exports = {
  expensesController: {
    getAll,
    create,
    getById,
    remove,
    update,
  },
};
