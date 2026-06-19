const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../services/user.service');

const getAll = async (req, res) => {
  const users = await getAllUsers();

  res.send(users);
};

const getById = async (req, res) => {
  const user = await getUser(req.params.id);

  if (!user) {
    return res.status(404).send({ error: ['User Not Found'] });
  }

  res.send(user);
};

const create = async (req, res) => {
  const userName = req.body.name;

  if (!userName) {
    res.status(400).end();

    return;
  }

  const user = await createUser(userName);

  res.status(201).send(user);
};

const deleteById = async (req, res) => {
  const deletedUser = await deleteUser(req.params.id);

  if (!deletedUser) {
    res.status(404).end();

    return;
  }

  res.status(204).end();
};

const update = async (req, res) => {
  const updatedUser = await updateUser(req.params.id, req.body);

  if (!updatedUser) {
    res.status(404).end();

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
