const usersService = require('../services/users.service');

const normalize = ({ id, name }) => ({
  id,
  name,
});

const getAll = async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.status(200).send(users.map((user) => normalize(user)));
  } catch (error) {
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await usersService.createUser(name);

    res.statusCode = 201;
    res.send(normalize(user));
  } catch (error) {
    res.sendStatus(500);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).send(normalize(user));
  } catch (error) {
    res.sendStatus(500);
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await usersService.removeUser(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await usersService.updateUserById(id, name);

    const updatedUser = await usersService.getById(id);

    res.status(200).send(normalize(updatedUser));
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  removeUser,
  updateUser,
};
