const usersServices = require('../services/usersServices');

const get = async (req, res) => {
  try {
    const users = await usersServices.getUsers();

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const choosedUser = await usersServices.getOneUser(id);

    if (!choosedUser) {
      return res.status(404).send();
    }

    return res.status(200).send(choosedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  const choosedUser = await usersServices.getOneUser(id);

  if (!choosedUser) {
    return res.status(404).send();
  }

  await usersServices.removeUser(id);

  res.status(204).send();
};

const patch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const choosedUser = await usersServices.getOneUser(id);

    if (!name) {
      return res.status(400).send('err name');
    }

    if (!choosedUser) {
      return res.status(404).send('err choosed user');
    }

    const update = await usersServices.updateUser({ id, name });

    return res.status(200).send(update);
  } catch (error) {
    return res.status(500).send();
  }
};

const post = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send();
  }

  const user = await usersServices.createUser(name);

  return res.status(201).send(user);
};

module.exports = {
  get,
  getOne,
  remove,
  patch,
  post,
};
