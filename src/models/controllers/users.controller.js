const userService = require('../services/user.service');

const getAll = async (req, res) => {
  const userAll = await userService.getAll();

  return res.json(userAll.map((uAll) => userService.normalizeUser(uAll)));
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(+id);

  if (!user) {
    return res.status(404).send({ message: 'Not found' });
  }

  return res.json(userService.normalizeUser(user));
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'Bad request' });
  }

  const userCreate = await userService.create(name);

  return res.status(201).json(userService.normalizeUser(userCreate));
};

const upDate = async (req, res) => {
  const { id } = req.params;

  const userUpdate = await userService.upDate({ id, ...req.body });

  if (!userUpdate) {
    return res.status(404).send({ message: 'Not found' });
  }

  Object.assign(userUpdate, req.body);

  return res.json(userService.normalizeUser(userUpdate));
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteUser = await userService.deleteById(id);

  if (!deleteUser) {
    return res.status(404).send({ message: 'Not found' });
  }

  return res.status(204).end();
};

const userController = {
  getAll,
  getById,
  create,
  upDate,
  deleteById,
};

module.exports = {
  userController,
};
