const { User } = require('../models/User.model');

const getAll = async (req, res) => {
  try {
    const result = await User.findAll();

    res.status(200).send(result);
  } catch {
    res.status(500).send('Server error');
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    res.status(200).send(user);
  } catch {
    res.status(404).send('Not found');
  }
};

const addUser = async (req, res) => {
  const { name, id } = req.body;

  if (id || typeof name !== 'string') {
    return res.status(400).send('Bad request');
  }

  try {
    const newUser = await User.create({ name });

    res.status(201).send(newUser);
  } catch {
    res.status(500).send('Server error');
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (typeof name !== 'string') {
      return res.status(400).send('Bad request');
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    user.name = name;
    await user.save();

    res.status(200).send(user);
  } catch {
    return res.status(500).send('Server error');
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    await user.destroy({});

    res.status(204).end();
  } catch {
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAll,
  getById,
  addUser,
  updateUser,
  deleteUser,
};
