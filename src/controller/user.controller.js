const userService = require('../service/user.service');

const get = (req, res) => {
  res.send(userService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = userService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
