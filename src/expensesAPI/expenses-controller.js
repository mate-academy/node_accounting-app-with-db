'use strict';

// Imports:
const { Expenses, Users } = require('../models');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const getAllExpenses = async(request, response) => {
  try {
    const params = request.query;
    const searchBy = [];
    const qweryDBsettings = {
      order: [
        ['created_at', 'ASC'],
      ],
    };

    if (params.userId) {
      searchBy.push({ userId: params.userId });
    }

    if (params.category) {
      searchBy.push({ category: params.category });
    }

    if (params.from && params.to) {
      searchBy.push({ spentAt: { [Op.between]: [6, 10] } });
    }

    if (params.userId || params.category || params.to) {
      qweryDBsettings.where = {
        [Op.or]: searchBy,
      };
    }

    const expensesFromDB = await Expenses.findAll(qweryDBsettings);

    response.statusCode = 200;
    response.json(expensesFromDB);
  } catch (e) {
    response.sendStatus(500);
  }
};

const getOneExpense = async(request, response) => {
  const { expenseId } = request.params;

  try {
    const expenseFromDB = await Expenses.findOne({
      where: {
        id: expenseId,
      },
    });

    if (!expenseFromDB) {
      response.sendStatus(404);

      return;
    }

    response.statusCode = 200;
    response.json(expenseFromDB);
  } catch (e) {
    response.sendStatus(500);
  }
};

const createExpense = async(req, res) => {
  try {
    const newData = req.body;
    const currentUser = await Users.findOne({
      where: {
        id: newData.userId,
      },
    });

    if (!newData.title || !currentUser) {
      res.sendStatus(400);

      return;
    }

    newData.id = uuidv4();
    await Expenses.create(newData);

    res.statusCode = 201;
    res.json(newData);
  } catch (e) {
    res.sendStatus(500);
  }
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;

  try {
    let expenseFromDB = await Expenses.findOne({
      where: {
        id: expenseId,
      },
    });
    const newData = req.body;

    if (!expenseFromDB || !newData.title) {
      res.sendStatus(404);

      return;
    }

    expenseFromDB = {
      ...expenseFromDB, ...newData, id: expenseFromDB.id,
    };

    await expenseFromDB.save();

    res.statusCode = 200;
    res.json(expenseFromDB);
  } catch (e) {
    res.sendStatus(500);
  }
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;

  try {
    const expenseFromDB = await Expenses.findOne({
      where: {
        id: expenseId,
      },
    });

    if (!expenseFromDB) {
      res.sendStatus(404);

      return;
    }

    expenseFromDB.destroy();

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
