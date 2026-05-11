const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  destroyExpense,
  updateExpense,
} = require('../services/expenses.services');

const getAllEx = async (req, res) => {
  try {
    const { userId, from, to, categories } = req.query;
    const allExpenses = await getAllExpenses();

    if (!userId && !categories && (!from || !to)) {
      return res.send(allExpenses);
    }

    const normalizedCategories =
      Array.isArray(categories) || !categories ? categories : [categories];

    let filteredExpenses = allExpenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        return expense.userId === parseInt(userId);
      });
    }

    if (normalizedCategories) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        return normalizedCategories.includes(expense.category);
      });
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter((expense) => {
        const spentAt = new Date(expense.spentAt);

        return spentAt >= fromDate && spentAt <= toDate;
      });
    }

    res.send(filteredExpenses);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getByIdExpense = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Invalid id provided');
  }

  try {
    const chosenExpense = await getExpenseById(id);

    if (!chosenExpense) {
      return res.sendStatus(404);
    }
    res.send(chosenExpense);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addNewExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.status(400).send('Incorrect data was passed');
  }

  try {
    const newExpense = await createExpense({
      userId,
      spentAt,
      title,
      amount,
      category: category || '',
      note: note || '',
    });

    res.status(201).send(newExpense);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await destroyExpense({ id });

    if (deletedRows === 0) {
      return res.status(404).send({ message: 'Expsense not found' });
    }

    res.sendStatus(204); // No content, deletion successful
  } catch (error) {
    res.status(500).send({ message: error.message }); // Server error
  }
};

const updateExpenseById = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!id) {
    res.status(400).send('Invalid id provided');
  }

  try {
    const updatedExpense = await updateExpense({
      id,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    if (!updatedExpense) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    res.status(200).send(updatedExpense);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllEx,
  getByIdExpense,
  addNewExpense,
  deleteExpense,
  updateExpenseById,
};
