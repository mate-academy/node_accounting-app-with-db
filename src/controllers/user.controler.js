const userService = require('../services/user.service');

const getAllUsers = (request, response) => {
  const users = userService.getAllUsers();

  response.status(200).send(users);
};

const getOneUser = (request, response) => {
  const userId = Number(request.params.id);

  const user = userService.getUserById(userId);

  if (!user) {
    response.status(404).send();

    return;
  }

  response.status(200).send(user);
};

const createUser = (request, response) => {
  const { name } = request.body;

  if (!name) {
    response.status(400).send();

    return;
  }

  const newUser = userService.addUser(name);

  response.status(201).send(newUser);
};

const updateUser = (request, response) => {
  const userId = Number(request.params.id);
  const { name } = request.body;

  if (!name) {
    response.status(400).send();

    return;
  }

  const userToUpdate = userService.updateUser({ id: userId, name });

  if (!userToUpdate) {
    response.status(404).send();

    return;
  }
  response.status(200).send(userToUpdate);
};

const deleteUser = (request, response) => {
  const userId = Number(request.params.id);

  const userToDelete = userService.getUserById(userId);

  if (!userToDelete) {
    response.status(404).send();

    return;
  }

  userService.deleteUser(userId);
  response.status(204).send();
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
