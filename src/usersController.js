const service = require('./usersServices.js');

const getAllUsers = async (req, res) => {
  try {
    const users = await service.getAllUsers();

    res.status(200).json(users);
  } catch {
    res.sendStatus(404);
  }
};

const addUser = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const user = await service.addUser(name);

    res.status(201).json(user);
  } catch {
    res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.sendStatus(400);
  }

  try {
    const foundUser = await service.getUser(userId);

    if (!foundUser) {
      return res.sendStatus(404);
    }

    res.status(200).json(foundUser);
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.sendStatus(404);
  }

  try {
    const isUser = service.getUser(userId);

    if (!isUser) {
      return res.sendStatus(404);
    }
  } catch (err) {
    throw err;
  }

  try {
    await service.deleteUser(userId);

    res.sendStatus(204);
  } catch (err) {
    throw err;
  }
};

const updateUser = async (req, res) => {
  const userToUpdateId = req.params.id;
  const userName = req.body.name;

  if (!userToUpdateId || !userName) {
    return res.sendStatus(400);
  }

  try {
    const isUser = await service.getUser(userToUpdateId);

    if (!isUser) {
      return res.sendStatus(404);
    }

    const updatedUser = await service.updateUser(userToUpdateId, userName);

    res.status(200).json(updatedUser);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
};
