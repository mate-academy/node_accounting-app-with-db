const usersService = require('../services/users.service');
const { statusCode } = require('../utils/statusCode');

const getAllUsers = async (req, res) => {
  const users = await usersService.allUsers();

  res.status = statusCode.OK;
  res.send(users.map((user) => usersService.normalize(user)));
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.userById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  res.status(statusCode.OK).send(usersService.normalize(user));
};

const getCreateUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const user = await usersService.createUser(name);

  res.status(statusCode.CREATED).send(user);
};

const getDeleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.userById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  await usersService.deleteUser(id);
  res.sendStatus(statusCode.NO_CONTENT);
};

const getUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersService.userById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  await usersService.updateUser(id, name);
  res.status(statusCode.OK).send(user);
};

module.exports = {
  getAllUsers,
  getUserById,
  getCreateUser,
  getDeleteUser,
  getUpdateUser,
};
