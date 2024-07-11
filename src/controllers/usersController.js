const userServices = require('../services/usersServices.js');

const listAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAll();

    res.status(200).send(users.map((user) => userServices.normalize(user)));
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userServices.getUserById(id);

    if (!user) {
      return res.sendStatus(404);
    }
    res.status(200).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required!');
  }

  try {
    const newUser = await userServices.createUser(name);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToRemove = await userServices.deleteUserById(Number(id));

    if (!userToRemove) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, spentAt, title, amount, category, note } = req.body;

  if (!id || !name) {
    return res.sendStatus(400);
  }

  try {
    const userToUpdate = await userServices.updateUserById({
      id: Number(id),
      name,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    if (!userToUpdate) {
      return res.sendStatus(404);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(userToUpdate);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  listAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
