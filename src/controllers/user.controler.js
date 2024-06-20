const userService = require('../services/user.service');

const getAllUsers = async (request, response) => {
  try {
    const users = await userService.getAllUsers();

    response.status(200).send(users);
  } catch (error) {
    response.status(404);
  }
};

const getOneUser = async (request, response) => {
  const userId = Number(request.params.id);

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      response.status(404).send();

      return;
    }
    response.status(200).send(user);
  } catch (error) {
    response.status(404);
  }
};

const createUser = async (request, response) => {
  const { name } = request.body;

  if (!name) {
    response.status(400).send();

    return;
  }

  try {
    const newUser = await userService.addUser(name);

    response.status(201).send(newUser);
  } catch (error) {
    response.status(404);
  }
};

const updateUser = async (request, response) => {
  const userId = Number(request.params.id);
  const { name } = request.body;

  if (!name) {
    response.status(400).send();

    return;
  }

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      response.status(404).send();

      return;
    }

    const userToUpdate = await userService.updateUser(userId, name);

    response.status(200).send(userToUpdate);
  } catch (error) {
    response.status(404);
  }
};

const deleteUser = async (request, response) => {
  const userId = Number(request.params.id);

  try {
    const userToDelete = await userService.getUserById(userId);

    if (!userToDelete) {
      response.status(404).send();

      return;
    }

    await userService.deleteUser(userId);
    response.status(204).send();
  } catch (error) {
    response.status(404);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
