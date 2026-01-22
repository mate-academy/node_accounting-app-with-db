const {
  getAll,
  getUserById,
  create,
  update,
  remove,
} = require('../services/user.service');

const get = async (req, res) => {
  const users = await getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await create(name);

  res.status(201).send(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await update(id, name);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.status(200).send(updatedUser);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  if (!(await getUserById(id))) {
    res.sendStatus(404);

    return;
  }

  await remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  createUser,
  updateUser,
  removeUser,
};
