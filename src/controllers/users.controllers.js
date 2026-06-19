const userService = require('../services/user.service');

// Get all users
const getAllUsers = async (req, res) => {
  res.status(200).send(await userService.getAllUsers());
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id))) {
    res.status(400).send('Write correct data');

    return;
  }

  const user = await userService.getUser(+id);

  if (!user) {
    res.status(404).send({ message: 'User does not exist' });

    return;
  }

  res.status(200).send(user);
};

// Create new user
const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'Name is required' });
  }

  const newUser = await userService.createUser(name);

  res.status(201).send(newUser);
};

// Update user
const updateUser = async (req, res) => {
  const uid = parseInt(req.params.id);
  const { name } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).send('Name is required');
  }

  if (!(await userService.getUser(uid))) {
    return res.status(404).send('Not found');
  }

  const updatedUser = await userService.updateUsers({ id: uid, name });

  res.status(200).send(updatedUser);
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getUser(+id))) {
    return res.status(404).send({ message: 'User not found' });
  }

  await userService.deleteUser(+id);
  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
