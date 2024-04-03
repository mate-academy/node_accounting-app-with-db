const usersService = require('../services/usersService');

const get = (req, res) => {
  res.statusCode = 200;
  res.send(usersService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(usersService.create(name));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!usersService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.update(id, name);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
