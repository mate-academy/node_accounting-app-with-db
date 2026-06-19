const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../services/category.service.js');

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await createCategory(name);

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

const editCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await updateCategory(req.params.id, name);

    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

const removeCategory = async (req, res) => {
  try {
    const deleted = await deleteCategory(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  removeCategory,
};
