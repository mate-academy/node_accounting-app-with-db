const status = require('../constants');
const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getAll();
  let returnData = [...expenses];

  if (userId) {
    returnData = returnData.filter(
      (e) => e.userId.toString() === userId.toString(),
    );
  }

  if (categories) {
    returnData = returnData.filter((e) => e.category === categories);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    returnData = returnData.filter(
      (e) => new Date(e.spentAt) >= fromDate && new Date(e.spentAt) <= toDate,
    );
  }

  res.send(returnData.map((e) => expensesService.normalize(e)));
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getOne(id);

  if (!expense) {
    return res.sendStatus(status.NOT_FOUND);
  }
  res.send(expensesService.normalize(expense));
};

const create = async (req, res) => {
  const { title, spentAt, userId, amount, category, note } = req.body;
  const isParamsValid = !title || !amount || !spentAt || !userId;

  if (isParamsValid) {
    return res.sendStatus(status.BAD_REQUEST);
  }

  const user = await userService.getOne(userId);

  if (!user) {
    return res.sendStatus(status.BAD_REQUEST);
  }

  const expense = await expensesService.createOne({
    title,
    spentAt,
    userId,
    amount,
    category,
    note,
  });

  res.status(status.CREATED).send(expensesService.normalize(expense));
};

const update = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.updateOne(id, req.body);

  if (!expense) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.status(status.OK).send(expensesService.normalize(expense));
};

const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await expensesService.deleteOne(id);

  if (!deleted) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.sendStatus(status.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
