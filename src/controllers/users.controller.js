const status = require('../constants');
const userService = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.send(users.map((user) => userService.normalize(user)));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }
  res.send(userService.normalize(user));
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.createOne({ name });

  res.status(status.CREATED).send(userService.normalize(user));
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.updateOne(id, { name });

  res.status(status.OK).send(userService.normalize(user));
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const deleted = await userService.deleteOne(id);

  if (!deleted) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.sendStatus(status.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
