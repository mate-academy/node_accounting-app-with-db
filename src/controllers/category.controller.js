const categoryService = require('../services/services');

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

module.exports = {
  categoryController: {
    getAll,
    getSingle,
  },
};
