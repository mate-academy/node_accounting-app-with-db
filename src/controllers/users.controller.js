const usersServise = require('../services/users.service');

const get = async (req, res) => {
  try {
    const users = await usersServise.getAll();

    if (!users) {
      return res.status(404).send();
    } else {
      return res.status(200).send(users);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send();
    }

    const user = await usersServise.getUser(id);

    if (!user) {
      return res.status(404).send();
    } else {
      return res.status(200).send(user);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const post = async (req, res) => {
  try {
    const { name } = req.body;

    if (name) {
      const added = await usersServise.addNew(name);

      return res.status(201).send(added);
    } else {
      return res.status(400).send();
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const patch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).send();
    }

    const updatedUser = await usersServise.updateUser(id, name);

    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const deleting = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersServise.getUser(id);

    if (user) {
      await usersServise.deleteUser(id);

      return res.status(204).send();
    }

    return res.status(404).send();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  get,
  getOne,
  post,
  patch,
  deleting,
};
