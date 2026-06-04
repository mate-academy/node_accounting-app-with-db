const {
  createUserObject,
  checkExpense,
  createExpenseObject,
} = require('../services/services.js');

const {
  models: { User, Expense },
} = require('../models/models.js');

const getUsers = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    const users = await User.findAll();

    res.statusCode = 200;
    res.send(users);
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

const getSingleUser = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;

  try {
    const user = await User.findByPk(Number(id));

    if (user) {
      res.statusCode = 200;
      res.send(user);
    } else {
      res.statusCode = 404;
      res.send({ error: 'User not found!' });
    }
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

const createUser = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send({ error: 'Bad request!' });

    return;
  }

  try {
    const user = await createUserObject(name);

    res.statusCode = 201;
    res.send(user);
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

const deleteUser = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;

  try {
    const user = await User.findByPk(Number(id));

    if (!user) {
      res.statusCode = 404;
      res.send({ error: 'User not found!' });

      return;
    }

    await user.destroy();

    res.statusCode = 204;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

const updateUser = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await User.findByPk(Number(id));

    if (!user) {
      res.statusCode = 404;
      res.send({ error: 'User not found!' });

      return;
    }

    await user.update({ name });

    res.statusCode = 200;
    res.send(user);
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

const getExpenses = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { userId, from, to, categories } = req.query;

  try {
    const allExpenses = await Expense.findAll();
    const filteredExpenses = checkExpense(
      userId,
      from,
      to,
      categories,
      allExpenses,
    );

    res.statusCode = 200;
    res.send(filteredExpenses);
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

const getSingleExpense = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(Number(id));

    if (!expense) {
      res.statusCode = 404;
      res.send({ error: 'Expense not found!' });

      return;
    }

    res.statusCode = 200;
    res.send(expense);
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

const createExpense = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { userId, title, amount, category, note, spentAt } = req.body;

  if (!userId || !title || !amount) {
    res.statusCode = 400;
    res.send({ error: 'Bad request!' });

    return;
  }

  try {
    const expense = await createExpenseObject({
      userId,
      title,
      amount,
      category,
      note,
      spentAt,
    });

    if (!expense) {
      res.statusCode = 400;
      res.send({ error: 'could not create expense!' });

      return;
    }

    res.statusCode = 201;
    res.send(expense);
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

const deleteExpense = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;

  try {
    const expense = await Expense.findByPk(Number(id));

    if (!expense) {
      res.statusCode = 404;
      res.send({ error: 'Expense not found!' });

      return;
    }

    await expense.destroy();

    res.statusCode = 204;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

const updateExpense = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;
  const { title, amount, category, note, spentAt } = req.body;

  try {
    const expense = await Expense.findByPk(Number(id));

    if (!expense) {
      res.statusCode = 404;
      res.send({ error: 'Expense not found!' });

      return;
    }

    await expense.update({
      title,
      amount,
      category,
      note,
      spentAt,
    });

    res.statusCode = 200;
    res.send(expense);
  } catch (err) {
    res.statusCode = 500;
    res.send({ error: 'Internal server error!' });
  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  getSingleUser,
  updateUser,
  getExpenses,
  getSingleExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
