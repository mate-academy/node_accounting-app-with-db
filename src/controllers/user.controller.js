'use strict';

function createUserController(userService) {
  const getUsers = async (req, res) => {
    const users = await userService.getAllUsers();

    res.send(users.map(userService.normalizeUser));
  };

  const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(userService.normalizeUser(user));
  };

  const createUser = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await userService.createUser(name);

    return res.status(201).send(userService.normalizeUser(user));
  };

  const removeUser = async (req, res) => {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await userService.removeUser(id);

    res.sendStatus(204);
  };

  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.sendStatus(400);
    }

    const user = await userService.updateUser(id, name);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(userService.normalizeUser(user));
  };

  return {
    getUsers,
    getUserById,
    createUser,
    removeUser,
    updateUser,
  };
}

module.exports = createUserController;
