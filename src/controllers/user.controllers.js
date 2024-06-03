const userService = require('../services/user.services');
const { statusCode } = require('../helpers/statusCode');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  res.status(statusCode.OK).send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(statusCode.BAD_REQUEST);

    return;
  }

  const user = await userService.create(name);

  res.status(statusCode.CREATED).send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  userService.remove(id);

  res.sendStatus(statusCode.NO_CONTENT);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(statusCode.UNPROCESSABLE_ENTITY);

    return;
  }

  const updatedUser = await userService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
