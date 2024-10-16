const userService = require('../services/userService');

const get = (req, res) => {
  res.send(userService.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.updateUser({ id, name });

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  update,
  create,
  remove,
};
