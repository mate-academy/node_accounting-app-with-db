const categoryService = require('./../services/category.service');

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoryService.getOneCategory(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    res.status(200).send(category);
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
};

const createCategory = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send({ message: 'Title is required' });
  }

  try {
    const newCategory = await categoryService.createCategory(title);

    res.status(201).send(newCategory);
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).send({ message: 'Title is required' });
  }

  try {
    const category = await categoryService.getOneCategory(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    const updatedCategory = categoryService.updateCategory({ id, title });

    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoryService.getOneCategory(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    await categoryService.deleteCategory(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
