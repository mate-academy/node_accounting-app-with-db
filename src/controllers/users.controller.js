const userService = require('../services/users.service');

const get = async (req, res) => {
  const users = await userService.getAllUsers();
  res.send(users);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);

  const foundUser = await userService.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const update = async (req, res) => {
  const { name } = req.body;
  const id = Number(req.params.id);

  const foundUser = await userService.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedUser = await userService.updateUser({ id, name });

  res.send(updatedUser);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!(await userService.getUserById(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
