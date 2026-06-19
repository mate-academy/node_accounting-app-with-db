const service = require('./user.repository');

const getAll = async (req, res) => {
  res.send(await service.getAll());
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await service.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const add = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const newUser = await service.add({ name });

  res.status(201).send(newUser);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const updatedUser = await service.update(id, { name });

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.status(200).send(updatedUser);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await service.deleteById(id);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
