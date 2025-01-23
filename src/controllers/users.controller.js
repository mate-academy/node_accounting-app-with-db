const { userService } = require('./../services/users.service');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    res.status(400).json({ message: 'ID parameter is required' });

    return;
  }

  const user = await userService.getById(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(200).send(user);
};

const createUser = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.status(400).json({ message: 'Name parameter is required' });

    return;
  }

  const user = await userService.create(name);

  if (!user) {
    res.status(500).json({ message: 'User was not created' });

    return;
  }

  res.status(201).send(user);
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (!name || !id) {
    res.status(400).json({ message: 'Parameters id and name are required' });

    return;
  }

  const updatedUser = await userService.update({ id, name });

  if (!updatedUser) {
    res.status(404).json({ message: 'User was not updated' });

    return;
  }

  res.status(200).send(updatedUser);
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    res.status(400).json({ message: 'ID parameter is required' });

    return;
  }

  const user = await userService.getById(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }
  await userService.remove(id);

  res.status(204).send();
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
