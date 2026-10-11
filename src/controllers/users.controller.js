const userServices = require('../services/users.services');

const getAll = async (req, res) => {
  res.send(await userServices.getAll());
};

const getUser = async (req, res) => {
  const user = await userServices.getUser(req.params.id);

  if (!user) {
    res.status(404).json({ message: 'Not found' });

    return;
  }

  res.send(user);
};

const add = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.status(400).json({ message: 'Name is required' });

    return;
  }

  const user = await userServices.create(name);

  res.status(201).send(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!(await userServices.getUser(id))) {
    res.status(404).json({ message: 'Not found' });

    return;
  }

  if (typeof name !== 'string' || !name) {
    res.status(400).json({ message: 'Name is required' });

    return;
  }

  res.send(await userServices.update(id, name));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userServices.getUser(id))) {
    res.status(404).json({ message: 'Not found' });

    return;
  }

  await userServices.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getUser,
  add,
  update,
  remove,
};
