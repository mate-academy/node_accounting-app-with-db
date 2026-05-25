const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categories.service.js');

const getAll = async (req, res) => {
  try {
    const categories = await getAllCategories();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'Id is required and must be a number' });
    }

    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res
        .status(400)
        .json({ message: 'name is required and must be a non-empty string' });
    }

    const category = await createCategory(name);
    const { createdAt, updatedAt, ...categoryData } = category.toJSON();

    return res.status(201).json(categoryData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const patch = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'Id is required and must be a number' });
    }

    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res
        .status(400)
        .json({ message: 'name is required and must be a non-empty string' });
    }

    const [updatedRowsCount] = await updateCategory(id, name);

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = await getCategoryById(id);

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOnce = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'Id is required and must be a number' });
    }

    const isDeleted = await deleteCategory(id);

    if (!isDeleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  patch,
  deleteOnce,
};
