const userService = require('../services/user.service');

const get = async (req, res) => {
  res.status(200).send(await userService.getUsers());
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUser(id);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  res.status(200).send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const newUser = await userService.createUser(name);

  res.status(201).send(newUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getUser(id))) {
    return res.status(404).send({ message: 'User not found' });
  }
  await userService.deleteUser(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.getUser(id);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  if (typeof name !== 'string' || !name) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const userToUpdate = await userService.updateUser({ id, name });

  res.status(200).json(userToUpdate);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
