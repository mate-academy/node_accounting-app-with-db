const expencesService = require('../services/expences.service');
const { validate: uuidValidate } = require('uuid');

const getAllExpences = async (_, res) => {
  const expences = await expencesService.getAllExpences();

  res.json(expences);
};

const getExpences = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId && !uuidValidate(userId)) {
    res.status(404).json({ message: 'Invalid id' });

    return;
  }

  const expences = await expencesService.getExpences({
    userId,
    categories,
    from,
    to,
  });

  res.json(expences);
};

const getExpenceById = async (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    res.status(404).json({ message: 'Invalid id' });

    return;
  }

  const expence = await expencesService.getExpenceById(id);

  if (!expence) {
    res.status(404).json({ message: 'Expence not found' });

    return;
  }

  res.json(expence);
};

const createExpence = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!uuidValidate(userId)) {
    res.status(400).json({ message: 'Invalid id' });

    return;
  }

  if (!userId || !spentAt || !title || !amount) {
    return res.status(404).json({ message: 'Missing required fields' });
  }

  const newExpence = await expencesService.createExpence({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!newExpence) {
    return res.status(400).json({ message: 'User not found' });
  }
  res.status(201).json(newExpence);
};

const deleteExpence = (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    res.status(404).json({ message: 'Invalid id' });

    return;
  }

  const isDeleted = expencesService.deleteExpence(id);

  if (!isDeleted) {
    return res.status(404).send({ message: 'Expence not found.' });
  }

  res.status(204).end();
};

const patchExpence = async (req, res) => {
  const { id } = req.params;

  const { spentAt, title, amount, category, note } = req.body;

  if (!uuidValidate(id)) {
    res.status(404).json({ message: 'Invalid id' });

    return;
  }

  if (!spentAt && !title && !amount && !category && !note) {
    return res.status(404).json({ message: 'No update information provided' });
  }

  const updateData = Object.entries({
    spentAt,
    title,
    amount,
    category,
    note,
  }).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }

    return acc;
  }, {});

  const expence = await expencesService.patchExpence(id, updateData);

  if (!expence) {
    res.status(404).json({ message: 'Expence not found' });

    return;
  }

  res.json(expence);
};

module.exports = {
  getExpences,
  getExpenceById,
  createExpence,
  getAllExpences,
  deleteExpence,
  patchExpence,
};
