const userService = require('../services/users.service');

const getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getUsers();

    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUser(+id);

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addUser = async (req, res) => {
  const userData = req.body;

  try {
    const user = await userService.addUser(userData);

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const user = await userService.updateUser(+id, userData);

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const didDelete = await userService.deleteUser(+id);

    if (didDelete) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
  updateUser,
};
