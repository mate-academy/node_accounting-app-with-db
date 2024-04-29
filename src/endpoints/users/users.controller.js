const usersServices = require('./users.services');

const get = async (req, res) => {
  const users = await usersServices.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await usersServices.getOne(+id);

  if (!user) {
    res.status(404).send('No such user was found');

    return;
  }

  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Name must be passed');

    return;
  }

  const createdUser = await usersServices.create(name);

  res.status(201).send(createdUser);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    res.status(400).send('Name must be passed');

    return;
  }

  if (!(await usersServices.getOne(+id))) {
    res.status(404).send('No such user was found');

    return;
  }

  await usersServices.update(name, id);

  const updatedUser = usersServices.getOne(+id);

  res.send(updatedUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await usersServices.getOne(+id))) {
    res.status(404).send('No such user was found');

    return;
  }

  usersServices.remove(+id);
  res.status(204).send('The user was deleted');
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
