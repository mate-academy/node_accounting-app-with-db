const expencesService = require('../services/expences.service');

const getAllExpences = (_, res) => {
  const expences = expencesService.getAllExpences();

  res.json(expences);
};

const getExpences = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const userIdNumber = Number(userId);

  const expences = expencesService.getExpences({
    userId: userIdNumber,
    categories,
    from,
    to,
  });

  res.json(expences);
};

const getExpenceById = (req, res) => {
  const { id } = req.params;
  const userIdNumber = Number(id);

  const expence = expencesService.getExpenceById(userIdNumber);

  if (!expence) {
    res.status(404).json({ message: 'Expence not found' });

    return;
  }

  res.json(expence);
};

const createExpence = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const userIdNumber = Number(userId);
  const amountNumber = Number(amount);

  if (!Number.isFinite(userIdNumber) || !Number.isFinite(amountNumber)) {
    return res
      .status(400)
      .json({ message: 'userId and amount should be valid number' });
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newExpence = expencesService.createExpence({
    userId: userIdNumber,
    spentAt,
    title,
    amount: amountNumber,
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

  const isDeleted = expencesService.deleteExpence(id);

  if (!isDeleted) {
    return res.status(404).send({ message: 'Expence not found.' });
  }

  res.status(204).end();
};

const patchExpence = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const numberedId = Number(id);

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

  const expence = expencesService.patchExpence(numberedId, updateData);

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
