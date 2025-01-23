const { userService } = require('./../services/users.service');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.status(200).json(users);
};

const getUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    res.status(400).json({ message: 'ID parameter is required' });

    return;
  }

  const user = userService.getById(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(200).send(user);
};

const createUser = (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.status(400).json({ message: 'Name parameter is required' });

    return;
  }

  const user = userService.create(name);

  if (!user) {
    res.status(404).json({ message: 'User was not created' });

    return;
  }

  res.status(201).send(user);
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (!name || !id) {
    res.status(400).json({ message: 'Parameters id and name are required' });

    return;
  }

  const updatedUser = userService.update({ id, name });

  if (!updatedUser) {
    res.status(404).json({ message: 'User was not updated' });

    return;
  }

  res.status(200).send(updatedUser);
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    res.status(400).json({ message: 'ID parameter is required' });

    return;
  }

  const user = userService.getById(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }
  userService.remove(id);

  res.status(204).send();
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
