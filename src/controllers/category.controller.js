const { categoryService } = require('../services/services');

const getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();

    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const category = await categoryService.getSingle(req.params.id);

    if (!category) {
      return res.sendStatus(404);
    }

    res.json(category);
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

    const user = await categoryService.create(name);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deletedUser = await categoryService.remove(req.params.id);

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
    const user = await categoryService.getSingle(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = await categoryService.update({
      id: req.params.id,
      name,
    });

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  categoryController: {
    getAll,
    getSingle,
    create,
    remove,
    update,
  },
};
