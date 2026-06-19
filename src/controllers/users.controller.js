const usersService = require('../services/user.service');

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();

    res.send(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to get users', error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundedUser = await usersService.getUserById(id);

    if (!foundedUser) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.send(foundedUser);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to get user', error: error.message });
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const foundedUser = await usersService.getUserById(id);

    if (!foundedUser) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    await usersService.removeUser(id);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to delete user', error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Name is required' });

    return;
  }

  try {
    const foundedUser = await usersService.getUserById(id);

    if (!foundedUser) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    const updatedUser = await usersService.updateUser(id, name);

    res.send(updatedUser);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to update user', error: error.message });
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Name is required' });

    return;
  }

  try {
    const newUser = await usersService.createUser(name);

    res.status(201).send(newUser);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Failed to create user', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  removeUser,
  updateUser,
  createUser,
};
