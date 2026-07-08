const { models } = require('../src/models/models.js');
const { Op } = require('sequelize');

const createUserController = () => {
  const { User, Expense } = models;

  const getUser = async (request, response) => {
    try {
      const result = await User.findAll();

      response.status(200).json(result);
    } catch (erro) {
      // eslint-disable-next-line no-console
      console.error('Erro');

      return response.status(500).json({ error: erro });
    }
  };

  const postAddUser = async (request, response) => {
    try {
      const { name } = await request.body;

      if (!name) {
        return response.sendStatus(400);
      }

      const user = await User.create({ name });

      response.status(201).json(user);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro');

      return response.status(500).json({ error: error });
    }
  };

  const getOne = async (request, response) => {
    const id = await parseInt(request.params.id);

    try {
      const get = await User.findOne({
        where: { id: id },
      });

      if (!get) {
        return response.sendStatus(404);
      }

      response.status(200).json(get);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };

  const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
      const user = await User.findOne({ where: { id: id } });

      if (!user) {
        return response.sendStatus(404);
      }
      await User.destroy({ where: { id: id } });
      response.sendStatus(204);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, 'erro');

      response.sendStatus(404);

      return response.status(500).json({ error: error });
    }
  };

  const editUser = async (request, response) => {
    const id = parseInt(request.params.id);
    const { name } = request.body;

    try {
      const isUser = await User.findOne({ where: { id: id } });

      if (!isUser) {
        return response.sendStatus(404);
      }

      const toEdit = await User.update(
        { name },
        { where: { id: id }, returning: true },
      );

      response.status(200).json(toEdit[1][0]);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  };
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

      if (allExpense.length === 0) {
        return response.status(200).json(allExpense);
      }

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

    const isUser = User.findOne({ where: { id: userId } });

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
    getUser,
    postAddUser,
    getOne,
    deleteUser,
    editUser,
    postExpense,
    getExpense,
    getOneExpense,
    updateExpense,
    deleteExpense,
  };
};

module.exports = {
  createUserController,
};
