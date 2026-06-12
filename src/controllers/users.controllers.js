const usersService = require('../services/users.service');

async function getAllUsers(req, res) {
  const users = await usersService.getAllUsers();

  return res.json(users);
}

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.createUser(name);

  res.statusCode = 201;

  res.send(user);
}

async function getUserById(req, res) {
  const id = Number(req.params.id);

  const user = await usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(user);
}

async function deleteUser(req, res) {
  const id = Number(req.params.id);

  const result = await usersService.deleteUser(id);

  if (!result) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
}

async function updateUser(req, res) {
  const id = Number(req.params.id);

  const userForUpdate = await usersService.updateUser(id, req.body);

  if (!userForUpdate) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(userForUpdate);
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
