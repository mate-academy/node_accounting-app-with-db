const userService = require('../services/user.service');
const userHelpers = require('../helpers/user.helpers');
const {
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
} = require('../constants/code.statuses');

const get = async (req, res) => {
  const users = await userService.getAll();

  res.send(users.map((user) => userHelpers.normalize(user)));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (await userHelpers.isUserExist(id, res)) {
    res.status(NOT_FOUND).send('User with this id not found');

    return;
  }

  const user = await userService.getById(id);

  res.send(userHelpers.normalize(user));
};

const create = async (req, res) => {
  const { name } = req.body;

  if (userHelpers.isNameValid(name)) {
    res
      .status(BAD_REQUEST)
      .send('Invalid request: "name" is required and must be a string.');

    return;
  }

  const user = await userService.create(name);

  res.status(CREATED).send(userHelpers.normalize(user));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (await userHelpers.isUserExist(id, res)) {
    res.status(NOT_FOUND).send('User with this id not found');

    return;
  }

  await userService.remove(id);

  res.sendStatus(NO_CONTENT);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (await userHelpers.isUserExist(id, res)) {
    res.status(NOT_FOUND).send('User with this id not found');

    return;
  }

  if (userHelpers.isNameValid(name)) {
    res
      .status(BAD_REQUEST)
      .send('Invalid request: "name" is required and must be a string.');

    return;
  }

  const updatedUser = await userService.update({ id, name });

  res.send(userHelpers.normalize(updatedUser));
};

module.exports = {
  get,
  create,
  remove,
  update,
  getOne,
};
