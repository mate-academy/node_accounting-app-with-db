const { expensesService } = require('../services/expenses-Services.js');
const { usersService } = require('../services/users-Services.js');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.status(200).json(expenses);
};

const create = async (req, res) => {
  const dataToCreate = req.body;
  const { userId, spentAt, title, amount } = dataToCreate;

  if (
    !userId ||
    typeof userId !== 'number' ||
    !spentAt ||
    typeof spentAt !== 'string' ||
    !title ||
    typeof title !== 'string' ||
    !amount ||
    typeof amount !== 'number' ||
    !(await usersService.getById(userId))
  ) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.create(dataToCreate);

  res.status(201).json(expense);
};

const getOne = async (req, res) => {
  const { expenseId } = req.params;
  const numberId = +expenseId;
  const expense = await expensesService.getById(numberId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(expense);
};

const deleteOne = async (req, res) => {
  const { expenseId } = req.params;
  const numberId = +expenseId;
  const expense = await expensesService.getById(numberId);

  if (!expense) {
    res.sendStatus(404);

    return;
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
    res.sendStatus(404);

    return;
  }

  try {
    const updatedExpense = await expensesService.update({
      id: numberId,
      ...reqBody,
    });

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.sendStatus(400);
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
