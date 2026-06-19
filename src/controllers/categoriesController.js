const { Category } = require('../models/Category.model');
const { getErrorWithStatus } = require('../utils/getError');

// GET /categories - Returnează toate categoriile
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [['name']],
    });

    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// POST /categories - Creează o categorie nouă
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      throw getErrorWithStatus(
        400,
        'Category name is required and must be a string.',
      );
    }

    const newCategory = await Category.create({ name });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// PUT /categories/:id - Actualizează o categorie existentă
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      throw getErrorWithStatus(404, `Category with ID ${id} not found`);
    }

    if (!name || typeof name !== 'string') {
      throw getErrorWithStatus(400, 'Category name must be a valid string.');
    }

    category.name = name;
    await category.save();

    res.json(category);
  } catch (error) {
    next(error);
  }
};

// DELETE /categories/:id - Șterge o categorie
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Category.destroy({
      where: { id },
    });

    if (deleted === 0) {
      throw getErrorWithStatus(404, `Category with ID ${id} not found`);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
