const userServices = require('../services/user.service.js');

const get = async (req, res) => {
  res.send(await userServices.getAll());
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const user = await userServices.create(name);

  res.statusCode = 201;
  res.send(user);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await userServices.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!(await userServices.getById(id))) {
    res.sendStatus(404);

    return;
  }

  await userServices.remove(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = await userServices.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await userServices.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
