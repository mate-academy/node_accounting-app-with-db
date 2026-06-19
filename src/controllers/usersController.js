const userService = require('../services/usersService');
const userHelpers = require('../helpers/user.helper');
const STATUS_CODE = require('../utils/statusCodes');

const getAll = async (_, res) => {
  const users = await userService.getAll();

  res
    .status(STATUS_CODE.SUCCESS)
    .send(users.map((user) => userHelpers.normalize(user)));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (await userHelpers.isUserExist(id, res)) {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .send('User with such id not found');
  }

  const user = await userService.getById(id);

  res.status(STATUS_CODE.SUCCESS).send(userHelpers.normalize(user));
};

const create = async (req, res) => {
  const { name } = req.body;

  if (userHelpers.isNameValid(name)) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .send('Error: "name" is required and must be a string.');
  }

  const user = await userService.create(name);

  res.status(STATUS_CODE.CREATED).send(userHelpers.normalize(user));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (await userHelpers.isUserExist(id, res)) {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .send('User with such id not found');
  }

  await userService.remove(id);

  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (await userHelpers.isUserExist(id, res)) {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .send('User with such id not found');
  }

  if (userHelpers.isNameValid(name)) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .send('Error: "name" is required and must be a string.');
  }

  const updatedUser = await userService.update({ id, name });

  res.status(STATUS_CODE.SUCCESS).send(userHelpers.normalize(updatedUser));
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  getOne,
};
