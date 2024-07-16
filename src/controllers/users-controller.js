/* eslint-disable no-console */
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  UpdateUserData,
} = require('../services/userService.js');

const getUsers = async (req, res) => {
  res.send(await getAllUsers());
};

const postUser = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = await createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getUser = async (req, res) => {
  const userId = +req.params.userId;

  const searchedUser = await getUserById(userId);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(searchedUser);
};

const deleteUser = async (req, res) => {
  const userId = +req.params.userId;

  try {
    await deleteUserById(userId);
    res.sendStatus(204);
  } catch {
    res.sendStatus(404);
  }
};

const updateUser = async (req, res) => {
  const userId = +req.params.userId;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);
  }

  try {
    const [affectedCount, updatedUsers] = await UpdateUserData(userId, name);

    if (affectedCount !== 1) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(updatedUsers[0]);
  } catch {
    res.sendStatus(404);
  }
};

module.exports = {
  getUsers,
  postUser,
  getUser,
  deleteUser,
  updateUser,
};
