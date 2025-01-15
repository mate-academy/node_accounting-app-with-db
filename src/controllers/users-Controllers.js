const usersService = require('../services/users-Services');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers;

  res.status(200).json(users);
};

const getUsersById = (req, res) => {
  const { id } = req.params;

  const user = usersService.getUserBYID(+id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = usersService.createUser(name);

  res.status(200).json(user);
};

const deleteUsers = (req, res) => {
  const { id } = req.params;
  const user = usersService.deleteUsers(+id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.status(200).json(user);
};

const uptadeUsers = (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const user = usersService.updateUser(+id, updatedUser);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

const usersControllers = {
  uptadeUsers,
  deleteUsers,
  createUser,
  getUsersById,
  getAllUsers,
};

module.exports = usersControllers;
