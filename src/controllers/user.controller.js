const { User } = require('../models/User.model');
const userService = require('../services/user.service');
const STATUS_CODES = require('../constant/statusCode');

const getAll = async (_, res) => {
  res.statusCode = STATUS_CODES.successful;
  res.send(await userService.getAll());
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  res.statusCode = STATUS_CODES.successful;
  res.send(user);
};

const postUser = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    return res.sendStatus(STATUS_CODES.badRequest);
  }

  const user = await userService.create(name);

  res.statusCode = STATUS_CODES.created;
  res.send(user);
};

const deleteUser = async (req, res) => {
  const { id } = await req.params;

  if (!(await userService.getById(id))) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  await userService.remove(id);

  return res.sendStatus(STATUS_CODES.noContent);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(STATUS_CODES.unprocessableEntity);
  }

  const userId = Number(id);
  const user = await userService.getById(userId);

  if (!user) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  await User.update({ name }, { where: { id } });

  const findUser = await userService.getById(userId);

  res.statusCode = STATUS_CODES.successful;
  res.send(findUser);
};

module.exports = {
  getAll,
  getById,
  postUser,
  deleteUser,
  updateUser,
};
