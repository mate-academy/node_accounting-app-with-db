const { normalize } = require('../models/User.model');
const {
  getAllUsers,
  addUserByName,
  getUserById,
  removeUserById,
  updateUserById,
} = require('../services/users.service');

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).send(users.map((user) => normalize(user)));
  } catch (err) {
    return res.status(500).send(err);
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await addUserByName(name);

    return res.status(201).send(normalize(user));
  } catch (err) {
    return res.status(500).send('An error occurred while creating user.');
  }
};

const getCurrentUser = async (req, res) => {
  const { id } = req.params;

  try {
    const currentUser = await getUserById(id);

    if (!currentUser) {
      return res.status(404);
    }

    return res.status(200).send(normalize(currentUser));
  } catch (err) {
    return res.status(500).send('An error occurred while fetching user.');
  }
};

const removeCurrentUser = (req, res) => {
  try {
    const { id } = req.params;

    removeUserById(id);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send('An error occurred while deleting user.');
  }
};

const updateCurrentUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const currentUser = await getUserById(id);

    const updatedUser = await updateUserById(currentUser, name, id);

    return res.send(normalize(updatedUser));
  } catch (err) {
    return res.status(500).send('An error occurred while updating user.');
  }
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  removeCurrentUser,
  updateCurrentUser,
};
