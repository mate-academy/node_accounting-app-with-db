const usersService = require('../services/users.service');
const HTTP_STATUS_CODES = require('../variables/httpStatusCodes');

const getAll = async (req, res) => {
  res.send(await usersService.getAll());
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

    return;
  }

  const user = await usersService.create(name);

  res.statusCode = HTTP_STATUS_CODES.CREATED;
  res.send(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

    return;
  }

  const updatedUser = await usersService.update(id, name);

  res.statusCode = HTTP_STATUS_CODES.OK;

  res.send(updatedUser);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  await usersService.remove(id);
  res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
