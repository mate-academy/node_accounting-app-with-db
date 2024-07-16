const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  UpdateUserData,
} = require('../services/userService.js');

const getUsers = (req, res) => {
  res.send(getAllUsers());
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getUser = (req, res) => {
  const userId = +req.params.userId;

  const searchedUser = getUserById(userId);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(searchedUser);
};

const deleteUser = (req, res) => {
  const userId = +req.params.userId;

  const searchedUser = getUserById(userId);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  deleteUserById(searchedUser.id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const userId = +req.params.userId;
  const { name } = req.body;

  const searchedUser = getUserById(userId);

  if (searchedUser === -1) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);
  }

  UpdateUserData(searchedUser, name);

  res.statusCode = 200;
  res.send(searchedUser);
};

module.exports = {
  getUsers,
  postUser,
  getUser,
  deleteUser,
  updateUser,
};
