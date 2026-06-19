const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  noramalize,
} = require('../services/users.services.js');

const getAll = async (_, res) => {
  const users = await getAllUsers();

  res.send(users.map((user) => noramalize(user)));
};

const getOne = async (req, res) => {
  const { id } = req.params;
  let user = null;

  try {
    user = await getUserById(id);
  } catch (e) {
    res.sendStatus(422);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(noramalize(user));
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await createUser(name);

  res.statusCode = 201;
  res.send(newUser.dataValues);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  let user = null;

  try {
    await updateUser(id, name);
  } catch {
    res.sendStatus(422);

    return;
  }

  try {
    user = await getUserById(id);
  } catch {
    user = null;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(noramalize(user));
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  let user = null;

  try {
    user = await getUserById(id);
  } catch {
    res.sendStatus(404);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  try {
    await deleteUser(id);
  } catch {
    res.sendStatus(422);
  }
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
