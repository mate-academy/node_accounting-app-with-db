const usersService = require('../services/usersService');

async function getUsers(req, res) {
  try {
    const users = await usersService.getAll();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createUser(req, res) {
  const { name } = req.body;

  try {
    const newUser = await usersService.create(name);

    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(err.code || 400).send({ message: err.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await usersService.getById(Number(id));

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const deleted = await usersService.remove(Number(id));

    if (!deleted) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateUser(req, res) {
  const id = Number(req.params.id);
  const { name } = req.body;

  try {
    const updated = await usersService.update(id, name);

    if (!updated) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(updated);
  } catch (err) {
    res.status(err.code || 500).send({ message: err.message });
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
