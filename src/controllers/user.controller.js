const userService = require('./../services/user.service');

const serverError = {
  message: 'Something went wrong with server',
};

const userNotFound = {
  message: 'User not found. Please check id',
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(serverError);
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'Name is required!' });
  }

  try {
    const user = await userService.createUser(name);

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(serverError);
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).send(userNotFound);
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(serverError);
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).send(userNotFound);
    }

    await userService.deleteUser(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).send(serverError);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).send(userNotFound);
    }

    if (!name) {
      return res.status(400).send({ message: 'Invalid name' });
    }

    const updatedUser = await userService.updateUser({ id, name });

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(serverError);
  }
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
