const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService.getAll();

  return res.status(200).json(users);
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).end();
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).end();
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).end();
    }

    await userService.remove(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(404).end();
  }
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).end();
  }

  const user = await userService.getById(id);

  const updatedUser = await userService.edit(user, { name });

  return res.status(200).json(updatedUser);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).end();
  }

  const user = await userService.create({ name });

  if (!user) {
    return res.status(404).end();
  }

  return res.status(201).json(user);
};

const userController = {
  get,
  getOne,
  remove,
  edit,
  create,
};

module.exports = userController;
