const usersService = require('../services/users.services');

async function getUsers(req, res) {
  const users = await usersService.getUsers();

  res.send(users.map(usersService.normalize));
}

async function getUserById(req, res) {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const user = await usersService.getUserById(+id);

  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.send(usersService.normalize(user));
}

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const newUser = await usersService.createUser(name);

  res.status(201).send(usersService.normalize(newUser));
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const wasDeleted = await usersService.deleteUser(+id);

  if (!wasDeleted) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(204).send();
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !id || isNaN(+id)) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const updatedUser = await usersService.updateUser({ id: +id, name });

  if (!updatedUser) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.send(usersService.normalize(updatedUser));
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
