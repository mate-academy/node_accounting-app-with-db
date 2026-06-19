const userServices = require('./../services/user.service');

const get = async (req, res) => {
  const users = await userServices.getAll();

  res.statusCode = 200;
  res.send(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await userServices.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServices.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await userServices.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userServices.removeUser(+id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const existingUser = await userServices.getById(+id);

  if (!existingUser) {
    res.sendStatus(404);

    return;
  }

  await userServices.updateUser({
    id,
    name,
  });

  const updatedUser = await userServices.getById(+id);

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
