const {
  getFilteredExpenses,
  addExpense,
  getExpenseById,
  removeExpenseById,
  updateExpenseById,
} = require('../services/expenses.service');

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const getFilteredExpense = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  try {
    const expenses = await getFilteredExpenses({
      userId,
      from,
      to,
      categories,
    });

    return res.status(200).send(expenses.map((expense) => normalize(expense)));
  } catch (err) {
    return res.status(500).send('An error occurred while fetching expense.');
  }
};

const setExpense = async (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category = null,
    note = null,
  } = req.body;

  try {
    const newExpense = await addExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return res.status(201).send(normalize(newExpense));
  } catch (err) {
    return res.status(500).send('An error occurred while sending expense.');
  }
};

const getCurrentExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const currentExpense = await getExpenseById(id);

    return res.status(200).send(normalize(currentExpense));
  } catch (err) {
    return res.status(500).send('An error occurred while fetching expense.');
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await removeExpenseById(id);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send('An error occurred while deleting expense.');
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  try {
    const updatedExpense = await updateExpenseById({
      spentAt,
      title,
      amount,
      category,
      note,
      id,
    });

    return res.send(normalize(updatedExpense));
  } catch (err) {
    return res.status(500).send('An error occurred while updating expense.');
  }
};

module.exports = {
  getFilteredExpense,
  setExpense,
  getCurrentExpense,
  deleteExpense,
  updateExpense,
};
