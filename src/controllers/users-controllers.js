const {
  getUsersData,
  getOneUserData,
  addUser,
  removeUser,
  updateUserData,
} = require('../services/users-service');

const { STATUS_CODES } = require('../utils/constants');

const getUsers = async (req, res) => {
  const users = await getUsersData();

  res.send(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await getOneUserData(id);

  if (!user) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send(res.statusCode);

    return;
  }

  res.statusCode = STATUS_CODES.OK;
  res.send(user);
};

const postUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = STATUS_CODES.BAD_REQUEST;
    res.send(res.statusCode);

    return;
  }

  const user = await addUser({ name });

  res.statusCode = STATUS_CODES.CREATED;
  res.send(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const previousUsers = await getUsersData();

  const newUsers = await removeUser(id);

  if (previousUsers.length === newUsers.length) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send(res.statusCode);

    return;
  }

  res.statusCode = STATUS_CODES.NO_CONTENT;
  res.send(res.statusCode);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await getOneUserData(id);

  if (!user) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send('User not found');

    return;
  }

  const updatedUser = await updateUserData(Number(user.id), name);

  res.send(updatedUser);
};

module.exports = {
  getUserById,
  getUsers,
  postUser,
  deleteUser,
  updateUser,
};
