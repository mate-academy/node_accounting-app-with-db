const usersServ = require('../services/users.service');
const statusCode = require('../utils/statusCode');

const getAllUsers = async (req, res) => {
  const users = await usersServ.allUsers();

  res.status = statusCode.OK;
  res.send(users.map((user) => usersServ.normalize(user)));
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await usersServ.userById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  res.status(statusCode.OK).send(usersServ.normalize(user));
};

const getCreateUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const user = await usersServ.createUser(name);

  res.status(statusCode.CREATED).send(user);
};

const getDeleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersServ.userById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  await usersServ.deleteUser(id);
  res.sendStatus(statusCode.NO_CONTENT);
};

const getUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersServ.userById(id);

  if (!user) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  await usersServ.updateUser(id, name);
  res.status(statusCode.OK).send(user);
};

module.exports = {
  getAllUsers,
  getUserById,
  getCreateUser,
  getDeleteUser,
  getUpdateUser,
};
