const userService = require('../services/userService');

const getUsers = async (req, res) => {
  try {
    res.send(await userService.getAllUsers());
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await userService.createUser(name);

    res.status(201).json(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!(await userService.getUserById(id))) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;
    const updatedUser = await userService.patchUser({ id, name });

    if (!updatedUser) {
      res.status(400).json({
        message: 'Failed to update user, validation error or other issue',
      });

      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userExists = await userService.getUserById(id);

    if (!userExists) {
      res.sendStatus(404);

      return;
    }

    const wasDeleted = await userService.deleteUser(id);

    if (!wasDeleted) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
