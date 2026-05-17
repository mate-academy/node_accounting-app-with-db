const {
  getUsers: getAllUsers,
  getUserById,
  removeUser: deleteUser,
  updateUser: updateUserById,
  createUser: createNewUser,
} = require('../services/user.service');

const getUsers = async (req, res) => {
  const users = await getAllUsers();

  res.status(200).send(users);
};

const getUsersById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(+id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.status(200).send(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(422).send('Please type your username');

    return;
  }

  const user = await createNewUser(name);

  res.status(201).send(user);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const user = await deleteUser(+id);

  if (!user) {
    res.status(404).send('User not found!');

    return;
  }

  res.status(200).send({ message: 'User removed!' });
};

const updateUser = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    res.status(422).send('Please type your username');

    return;
  }

  const user = await updateUserById(name, id);

  if (!user) {
    res.status(404).send('User not found!');

    return;
  }

  res.status(200).send(user);
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  removeUser,
};
