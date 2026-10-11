const userServices = require('../services/users.services');

const getAll = async (req, res) => {
  res.send(await userServices.getAll());
};

const getUser = async (req, res) => {
  const user = await userServices.getUser(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const add = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  const user = await userServices.create(name);

  res.status(201).send(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!(await userServices.getUser(id))) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  res.send(await userServices.update(id, name));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userServices.getUser(id))) {
    res.sendStatus(404);

    return;
  }

  await userServices.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getUser,
  add,
  update,
  remove,
};
