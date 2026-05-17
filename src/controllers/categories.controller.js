const categoriesModel = require('../services/categories.js');
const { normalizeCategory } = require('../services/normalize.js');

async function getAllCategories(req, res) {
  try {
    const categories = await categoriesModel.getAllCategories();

    res.status(200).json(categories.map((cat) => normalizeCategory(cat)));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати категорії' });
  }
}

async function getCategory(req, res) {
  try {
    const categoryId = +req.params.categoryId;
    const category = await categoriesModel.getUser(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ message: `Категорію ${categoryId} не знайдено` });
    }

    res.status(200).json(normalizeCategory(category));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати категорію' });
  }
}

async function postCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newCategory = await categoriesModel.createCategory(name);

    res.status(201).json(normalizeCategory(newCategory));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити категорію' });
  }
}

async function removeCategory(req, res) {
  try {
    const categoryId = +req.params.categoryId;
    const removedCategory = await categoriesModel.removeCategory(categoryId);

    if (!removedCategory) {
      return res
        .status(404)
        .json({ message: `Категорію ${categoryId} не знайдено` });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити категорію' });
  }
}

async function updateCategory(req, res) {
  try {
    const { name } = req.body;
    const categoryId = +req.params.categoryId;

    if (!name) {
      return res.status(400).json({ error: 'New name is required' });
    } else if (!categoryId) {
      return res.status(400).json({ error: 'categoryId is required in URL' });
    }

    const updatedCategory = await categoriesModel.updateCategory(
      categoryId,
      name,
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Не вдалось отримати категорію' });
    }

    res.status(200).json(normalizeCategory(updatedCategory));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося оновити категорію' });
  }
}

module.exports = {
  getAllCategories,
  getCategory,
  postCategory,
  removeCategory,
  updateCategory,
};
