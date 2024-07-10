const usersServise = require('../services/users.service');

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_CREATED = 201;

const get = async (req, res) => {
  try {
    const users = await usersServise.getAll();

    if (!users) {
      return res.status(HTTP_NOT_FOUND).send();
    } else {
      return res.status(HTTP_OK).send(users);
    }
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(HTTP_BAD_REQUEST).send();
    }

    const user = await usersServise.getUser(id);

    if (!user) {
      return res.status(HTTP_NOT_FOUND).send();
    } else {
      return res.status(HTTP_OK).send(user);
    }
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

const post = async (req, res) => {
  try {
    const { name } = req.body;

    if (name) {
      const added = await usersServise.addNew(name);

      return res.status(HTTP_CREATED).send(added);
    } else {
      return res.status(HTTP_BAD_REQUEST).send();
    }
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

const patch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) {
      return res.status(HTTP_BAD_REQUEST).send();
    }

    const updatedUser = await usersServise.updateUser(id, name);

    if (updatedUser) {
      return res.status(HTTP_OK).json(updatedUser);
    } else {
      return res.status(HTTP_NOT_FOUND).send();
    }
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

const deleting = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersServise.getUser(id);

    if (user) {
      await usersServise.deleteUser(id);

      return res.status(HTTP_NO_CONTENT).send();
    }

    return res.status(HTTP_NOT_FOUND).send();
  } catch (err) {
    return res.status(HTTP_BAD_REQUEST).send(err.message);
  }
};

module.exports = {
  get,
  getOne,
  post,
  patch,
  deleting,
};
