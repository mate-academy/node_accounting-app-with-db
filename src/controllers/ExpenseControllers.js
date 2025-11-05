const expenseService = require('../service/expenseService');

const getAllExps = async (req, res) => {
  const querry = req.query;

  try {
    const exps = await expenseService.getAll(querry);

    res.status(200).json(exps);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getExById = async (req, res) => {
  const { id } = req.params;

  try {
    const expbyId = await expenseService.getById(id);

    if (!expbyId) {
      return res.status(404).send('Expense not found');
    }

    res.status(200).send(expbyId);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const addEx = async (req, res) => {
  try {
    const newEx = await expenseService.create(req.body);

    res.status(201).json(newEx);
  } catch (error) {
    res.status(400).send('Exp not added!');
  }
};

const updateExp = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await expenseService.update(id, req.body);

    if (!updated) {
      return res.status(404).send('exp for update not found');
    }

    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

const removeExp = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await expenseService.remove(id);

    if (deletedCount === 0) {
      return res.status(404).send('Exp not exist!');
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getAllExps,
  getExById,
  addEx,
  updateExp,
  removeExp,
};
