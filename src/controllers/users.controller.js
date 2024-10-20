const {
  getAllUsers,
  getUserById,
  createUser,
  destroyUser,
  updateUser,
} = require('../services/users.service');

const getAllUs = async (req, res) => {
  try {
    const usersFromDB = await getAllUsers();

    res.status(200).send(usersFromDB);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getByIdUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Invalid id provided');
  }

  try {
    const chosenUser = await getUserById(id);

    if (!chosenUser) {
      return res.sendStatus(404);
    }

    res.status(200).send(chosenUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addNewUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const user = await createUser({ name });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await destroyUser({ id });

    if (deletedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).send({ message: 'Invalid name provided' });
  }

  if (!id) {
    res.status(400).send('Invalid id provided');
  }

  try {
    const updatedUser = await updateUser({ id, name });

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllUs,
  getByIdUser,
  addNewUser,
  deleteUser,
  updateUserById,
};
