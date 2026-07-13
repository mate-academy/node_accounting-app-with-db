const { models } = require('../models/models.js');

const createExpenseController = () => {
  const { User, Expense } = models;
  const { Op } = require('sequelize');

  const getExpense = async (request, response) => {
    const userIdQuery = parseInt(request.query.userId);
    const { from, to } = request.query;
    const { categories } = request.query;
    const filtros = {};

    if (userIdQuery) {
      filtros.userId = userIdQuery;
    }

    if (categories) {
      filtros.category = categories;
    }

    if (from && to) {
      filtros.spentAt = { [Op.between]: [from, to] };
    }

    try {
      const allExpense = await Expense.findAll({
        where: filtros,
      });

      return response.status(200).json(allExpense);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  const postExpense = async (request, response) => {
    const { spentAt, title, category, note } = request.body;
    const userId = parseInt(request.body.userId);
    const amount = parseInt(request.body.amount);

    if (!spentAt || !title || !amount || !userId) {
      return response.sendStatus(400);
    }

    const isUser = await User.findOne({ where: { id: userId } });

    if (!isUser) {
      return response.sendStatus(400);
    }

    try {
      const createExpense = await Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      response.status(201).json(createExpense);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  const getOneExpense = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
      const expense = await Expense.findOne({
        where: {
          id: id,
        },
      });

      if (!expense) {
        return response.sendStatus(404);
      }

      response.status(200).json(expense);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  const updateExpense = async (request, response) => {
    const { spentAt, title, amount, category, note } = request.body;
    const expenseId = parseInt(request.params.id);

    try {
      const isExpense = await Expense.findOne({ where: { id: expenseId } });

      if (!isExpense) {
        return response.sendStatus(404);
      }

      const editExpense = await Expense.update(
        {
          spentAt,
          title,
          amount,
          category,
          note,
        },
        { where: { id: expenseId }, returning: true },
      );

      response.status(200).json(editExpense[1][0]);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  const deleteExpense = async (request, response) => {
    const expenseId = parseInt(request.params.id);

    try {
      const deletedCount = await Expense.destroy({
        where: { id: expenseId },
      });

      if (deletedCount === 0) {
        return response.sendStatus(404);
      }

      response.sendStatus(204);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  return {
    postExpense,
    getExpense,
    getOneExpense,
    updateExpense,
    deleteExpense,
  };
};

module.exports = { createExpenseController };
