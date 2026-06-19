const {
  getAllUsersService,
  createUserService,
  findUserByIdService,
  deleteUserService,
  updateUserService,
} = require('../services/users.service');

const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();

  res.send(users);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const createdUser = await createUserService({ name });

  res.status(201).send(createdUser);
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const user = await findUserByIdService(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await findUserByIdService(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  await deleteUserService(id);
  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await findUserByIdService(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await updateUserService(+id, name);

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  createUser,
  findUserById,
  deleteUser,
  updateUser,
};
