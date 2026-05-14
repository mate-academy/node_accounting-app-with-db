const { usersRepository } = require('./user.repository');

const getAll = async (req, res) => {
  const users = await usersRepository.getAll();

  res.json(users);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'name  required' });
  }

  const user = await usersRepository.createUser(name);

  return res.status(201).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await usersRepository.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersRepository.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Name is required' });
  }

  const updatedUser = await usersRepository.updateUser({ id, name });

  res.send(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersRepository.getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  await usersRepository.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
