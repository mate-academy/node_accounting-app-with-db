const { userService } = require('../services/user.service.js');

const getUsers = async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
};

const createUser = async (req, res) => {
  const name = req.body.name;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Name is required and must be a valid string.' });
  }

  const user = await userService.createUser(name.trim());

  res.status(201).json(user);
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(+req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  res.json(user);
};

const updateUser = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const normalizedId = +id;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Name is required and must be a valid string.' });
  }

  const user = await userService.getUserById(normalizedId);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const updatedUser = await userService.updateUser({
    id: normalizedId,
    name: name.trim(),
  });

  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const user = await userService.deleteUser(+req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  res.sendStatus(204);
};

const userController = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};

module.exports = {
  userController,
};
