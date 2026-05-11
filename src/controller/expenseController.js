const expenseService = require('../service/expenseService');
const userService = require('../service/userService');

const getAll = async (req, res) => {
  try {
    const result = await expenseService.getAllExpenses(req.query);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

const getById = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).send({ message: 'ID must be a number' });
  }

  try {
    const result = await expenseService.getExpenseById(+id);

    if (!result) {
      res.status(404).json({ message: 'No such expense' });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    res.status(400).json({ message: 'All fields must be filled' });

    return;
  }

  const normalizedBody = {
    userId,
    spentAt,
    title,
    amount,
    category: category || 'Uknown',
    note: note || 'Uknown',
  };

  try {
    const isUser = await userService.getUserById(+userId);

    if (!isUser) {
      return res.status(400).send({ message: 'Not such user' });
    }

    const result = await expenseService.createExpense(normalizedBody);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

const update = async (req, res) => {
  const id = +req.params.id;
  const { userId } = req.body;

  if (isNaN(id)) {
    return res.status(400).send({ message: 'ID should be a number' });
  }

  try {
    if (userId) {
      const isUser = await userService.getUserById(+userId);

      if (!isUser) {
        return res.status(404).send({ message: 'Not such user' });
      }
    }

    const result = await expenseService.updateExpense(id, req.body);

    if (!result) {
      return res.status(404).send({ message: 'No such expense' });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(+id)) {
    res.status(400).json({ message: 'ID should be a number' });

    return;
  }

  try {
    const result = await expenseService.deleteExpense(+id);

    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'No such expense' });
    }
  } catch (error) {
    res.status(500).json({ serverError: error });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
