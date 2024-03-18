const {
  getAllUsers,
  createUser,
  getUser,
  patchUser,
  deleteUser,
} = require('../services/User.services');
const {
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
} = require('../statusCodes/statusCodes');

const getAllController = async (req, res) => {
  res.status(OK).send(await getAllUsers());
};

const getByIdController = async (req, res) => {
  const { userId } = req.params;

  const user = await getUser(userId);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(OK).send(user);
};

const deleteUserController = async (req, res) => {
  const { userId } = req.params;
  const user = await getUser(userId);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  await deleteUser(userId);
  res.sendStatus(NO_CONTENT);
};

const postUserController = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = await createUser(name);

  res.status(CREATED).send(user);
};

const updateUserController = async (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  const user = await getUser(userId);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(OK).send(await patchUser(userId, name));
};

module.exports = {
  getAllController,
  getByIdController,
  updateUserController,
  postUserController,
  deleteUserController,
};
