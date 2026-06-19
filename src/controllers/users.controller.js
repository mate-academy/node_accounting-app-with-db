/* eslint-disable no-console */
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
} = require('../services/users.service');

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getUserByIdController = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send({ message: 'User ID is required' });

    return;
  }

  try {
    const user = await getUser(userId);

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.status(200).send(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const createUserController = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Name is required' });

    return;
  }

  try {
    const user = await createUser(name);

    res.status(201).send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const deleteUserController = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send({ message: 'User ID is required' });

    return;
  }

  try {
    const isUserRemoved = await deleteUser(userId);

    if (isUserRemoved) {
      res.sendStatus(204);

      return;
    }

    res.status(404).send({ message: 'User not found' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const updateUserController = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  if (!userId) {
    res.status(400).send({ message: 'User ID is required' });

    return;
  }

  if (Object.keys(body).length === 0) {
    res.status(400).send({ message: 'Request body cannot be empty' });

    return;
  }

  try {
    const user = await getUser(userId);
    const { createdAt, id, updatedAt } = user;
    const { name } = body;

    const isUserUpdated = await updateUser(userId, body);

    if (!isUserUpdated) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.status(200).send({
      createdAt,
      id,
      updatedAt,
      name,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  deleteUserController,
  updateUserController,
};
