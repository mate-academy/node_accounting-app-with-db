const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.status(200).json(expenses);
};

const create = async (req, res) => {
  const dataToCreate = req.body;
  const { userId, spentAt, title, amount } = dataToCreate;

  const errors = [];

  if (!userId || typeof userId !== 'number') {
    errors.push('Поле "userId" должно быть числом.');
  }

  if (!spentAt || typeof spentAt !== 'string') {
    errors.push('Поле "spentAt" должно быть строкой.');
  }

  if (!title || typeof title !== 'string') {
    errors.push('Поле "title" должно быть строкой.');
  }

  if (!amount || typeof amount !== 'number') {
    errors.push('Поле "amount" должно быть числом.');
  }

  if (!(await usersService.getById(userId))) {
    errors.push('Пользователь с указанным "userId" не найден.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Ошибка валидации', errors });
  }

  const expense = await expensesService.create(dataToCreate);

  res.status(201).json(expense);
};

const getOne = async (req, res) => {
  const { expenseId } = req.params;
  const numberId = +expenseId;
  const expense = await expensesService.getById(numberId);

  if (!expense) {
    return res
      .status(404)
      .json({ message: 'Расход с указанным ID не найден.' });
  }

  res.status(200).json(expense);
};

const deleteOne = async (req, res) => {
  const { expenseId } = req.params;
  const numberId = +expenseId;
  const expense = await expensesService.getById(numberId);

  if (!expense) {
    return res
      .status(404)
      .json({ message: 'Расход с указанным ID не найден.' });
  }

  await expensesService.deleteById(numberId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { expenseId } = req.params;
  const reqBody = req.body;
  const numberId = +expenseId;
  const expense = await expensesService.getById(numberId);

  if (!expense) {
    return res
      .status(404)
      .json({ message: 'Расход с указанным ID не найден.' });
  }

  try {
    const updatedExpense = await expensesService.update({
      id: numberId,
      ...reqBody,
    });

    res.status(200).json(updatedExpense);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Ошибка при обновлении данных.', error: error.message });
  }
};

const expensesController = {
  getAll,
  create,
  getOne,
  deleteOne,
  update,
};

module.exports = {
  expensesController,
};
