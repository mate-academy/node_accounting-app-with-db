'use strict';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');

async function getExpenses(req, res) {
  try {
    return res
      .status(StatusCodes.OK)
      .send(await expensesService.get(req.query));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
}

async function postExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if ((!userId, !spentAt, !title, !amount)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        `${ReasonPhrases.BAD_REQUEST}: userId, spentAt, title, amount, category are required`,
      );
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        `${ReasonPhrases.BAD_REQUEST}: user with id ${userId} does not exist`,
      );
  }

  try {
    return res.status(StatusCodes.CREATED).send(
      await expensesService.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      }),
    );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
}

async function getExpenseById(req, res) {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);
  }

  try {
    const expense = await expensesService.getById(id);

    if (!expense) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(
          `${ReasonPhrases.NOT_FOUND}: expense with id ${id} does not exist`,
        );
    }

    res.status(StatusCodes.OK).send(expense);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
}

async function removeExpense(req, res) {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: expense with id ${id} does not exist`);
  }

  try {
    await expensesService.remove(id);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
}

async function udpateExpense(req, res) {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);
  }

  if (!data) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: data is required`);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: expense with id ${id} does not exist`);
  }

  try {
    const [result] = await expensesService.update(id, data);

    if (result !== 1) {
      return res.status(StatusCodes.NOT_FOUND).send('Expense not found');
    }

    const updatedExpense = await expensesService.getById(id);

    return res.status(StatusCodes.OK).send(updatedExpense);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
}

module.exports = {
  getExpenses,
  postExpense,
  getExpenseById,
  removeExpense,
  udpateExpense,
};
