const userService = require('../services/user.service');

const get = async (req, res) => {
  return res.status(200).json(await userService.getAllUsers());
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send();
  }

  const newUser = await userService.createUser(name);

  return res.status(201).json(newUser);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send();
  }

  const findUser = await userService.getUserById(id);

  if (!findUser) {
    return res.status(404).send();
  }

  return res.status(200).json(findUser);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  const findUser = await userService.getUserById(id);

  if (!findUser) {
    return res.status(404).send();
  }

  await userService.deleteUser(id);

  return res.status(204).send();
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!id || isNaN(id) || !name) {
    return res.status(400).send();
  }

  const findUser = await userService.getUserById(id);

  if (!findUser) {
    return res.status(404).send();
  }

  const [, [updatedUser]] = await userService.updateUser(id, name);

  return res.status(200).json(updatedUser.dataValues);
};

module.exports = {
  create,
  get,
  getById,
  remove,
  update,
};
