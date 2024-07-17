const userService = require('./../services/users.service.js');

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

const get = async (req, res) => {
  res.statusCode = STATUS_CODES.OK;

  res.send(await userService.getAll());
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_CODES.OK;
  res.send(user);
};
const post = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const item = await userService.create(name);

  if (!item) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  res.statusCode = STATUS_CODES.CREATED;
  res.send(item);
};
const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(id))) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  await userService.remove(id);

  res.sendStatus(STATUS_CODES.NO_CONTENT);
};

const patch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!(await userService.getById(id))) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  const user = await userService.change(id, name);

  res.statusCode = STATUS_CODES.OK;
  res.send(user);
};

module.exports = {
  get,
  getOne,
  post,
  remove,
  patch,
};
