const {
  getAll,
  getById,
  update,
  create,
  remove,
} = require('../services/users.service');

const getAllUsers = async (req, res) => {
  try {
    const users = await getAll();

    res.send(users);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await getById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

const addUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const user = await create(name);

    res.status(201).send(user);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(422).send(error.errors.map((e) => e.message));
    }

    res.status(500).send('Internal server error');
  }
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  try {
    const user = await getById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!name || typeof name !== 'string') {
      return res.status(422).send('Invalid name');
    }

    await update({ id, name });

    const updatedUser = await getById(id);

    res.send(updatedUser);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(422).send(error.errors.map((e) => e.message));
    }

    res.status(500).send('Internal server error');
  }
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await getById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    await remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
