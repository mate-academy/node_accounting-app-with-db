/* eslint-disable no-console */
const {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
} = require('../services/categories.service');

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.send(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getCategoryByIdController = async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    res.status(400).send({ message: 'Category ID is required' });

    return;
  }

  try {
    const category = await getCategory(categoryId);

    if (!category) {
      res.status(404).send({ message: 'Category not found' });

      return;
    }

    res.status(200).send(category);
  } catch (error) {
    console.error('Error getting category by ID:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const createCategoryController = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Name is required' });

    return;
  }

  try {
    const category = await createCategory(name);

    res.status(201).send(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const deleteCategoryController = async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    res.status(400).send({ message: 'Category ID is required' });

    return;
  }

  try {
    const isCategoryRemoved = await deleteCategory(categoryId);

    if (isCategoryRemoved) {
      res.sendStatus(204);

      return;
    }

    res.status(404).send({ message: 'Category not found' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const updateCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  const { body } = req;

  if (!categoryId) {
    res.status(400).send({ message: 'Category ID is required' });

    return;
  }

  if (Object.keys(body).length === 0) {
    res.status(400).send({ message: 'Request body cannot be empty' });

    return;
  }

  try {
    const category = await getCategory(categoryId);
    const { createdAt, id, updatedAt } = category;
    const { name } = body;

    const isCategoryUpdated = await updateCategory(categoryId, body);

    if (!isCategoryUpdated) {
      res.status(404).send({ message: 'Category not found' });

      return;
    }

    res.status(200).send({
      createdAt,
      id,
      updatedAt,
      name,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
};
