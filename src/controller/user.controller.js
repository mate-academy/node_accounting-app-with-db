const userService = require('../service/user.service');

const getUsers = async (_, res) => {
  const users = await userService.getUsers();

  if (!users) {
    return res.status(404).json({ message: 'NOT FOUND' });
  }

  return res.status(200).json(users);
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);

  if (newUser === null) {
    return res.status(400).json({ message: '"Name" content is empty' });
  }

  return res.status(201).json(newUser);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const findUser = await userService.getUserById(id);

  if (!findUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(findUser);
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const findUser = await userService.deleteUserById(id);

  if (!findUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(204).end();
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"Name" content is empty' });
  }

  const update = await userService.updateUser(req.body, id);

  if (!update) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(update);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUser,
};
