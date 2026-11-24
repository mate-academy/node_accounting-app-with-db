const usersService = require('./users.service.js');

const getAll = async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.json(users);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  try {
    const user = await usersService.getOne(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  } catch (err) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  if (!isValidParams(req.body)) {
    return res.sendStatus(400);
  }

  try {
    const user = await usersService.create(req.body);

    res.status(201).json(user);
  } catch (err) {
    res.sendStatus(500);
  }
};

const deleteOne = async (req, res) => {
  try {
    const user = await usersService.getOne(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    await usersService.deleteById(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

const update = async (req, res) => {
  try {
    const user = await usersService.getOne(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (!req.body || !isValidParams(req.body)) {
      return res.sendStatus(400);
    }

    const updatedUser = await usersService.update(req.params.id, req.body);

    res.json(updatedUser);
  } catch (err) {
    res.sendStatus(500);
  }
};

const isValidParams = (params) => {
  if (!params) {
    return false;
  }

  const { name } = params;

  return Boolean(name);
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
