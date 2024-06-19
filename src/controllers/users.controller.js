const usersService = require('../services/users.service');

const getAllUsers = async (_req, res) => {
  try {
    const users = await usersService.getUsers();

    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersService.getUser(+id);

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await usersService.createUser(name);

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await usersService.getUser(+id, name);

    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = await usersService.updateUser({ id: Number(id), name });

    return res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersService.getUser(id);

    if (!user) {
      return res.sendStatus(404);
    }

    usersService.deleteUser(user.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
};
