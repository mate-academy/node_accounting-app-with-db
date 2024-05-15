const status = require('../constants/httpStatusCodes');
const usersService = require('../services/users.service');

const getAllUsers = async (req, res) => {
  const users = await usersService.getAllUsers();

  res.send(users);
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(Number(id));

  if (!user) {
    res.sendStatus(status.notFound);

    return;
  }

  res.statusCode = status.successful;

  res.send(user);
};

const createNewUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(status.badRequest);

    return;
  }

  const user = await usersService.createUser(name);

  res.statusCode = status.created;

  res.send(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(Number(id));

  if (!user) {
    res.sendStatus(status.notFound);

    return;
  }

  await usersService.removeUser(id);

  res.sendStatus(status.noContent);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await usersService.getUserById(Number(id));

  if (!user) {
    res.sendStatus(status.badRequest);

    return;
  }

  if (typeof name !== 'string') {
    res.status(status.unprocessableEntity);

    return;
  }

  await usersService.updateUser({ id, name });

  const updatedUser = await usersService.getUserById(id);

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  deleteUser,
  updateUser,
};
