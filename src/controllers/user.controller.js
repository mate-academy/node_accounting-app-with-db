const { userService } = require('../services/services');

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const user = await userService.getSingle(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await userService.create(name);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deletedUser = await userService.remove(req.params.id);

    if (!deletedUser) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await userService.getSingle(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = await userService.update({
      id: req.params.id,
      name,
    });

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userController: {
    getAll,
    getSingle,
    create,
    remove,
    update,
  },
};
