const categoriesService = require('./categories.service');

class CategoriesController {
  async getAll(req, res) {
    try {
      const categoriesList = await categoriesService.getAllCategories();

      res.status(200).send(categoriesList);
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const id = Number(req.params.id);

      const categoryItem = await categoriesService.getOneCategory(id);

      if (!categoryItem) {
        res.status(404).send({ message: 'Category not found' });

        return;
      }

      res.status(200).send(categoryItem);
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }

  async postOne(req, res) {
    try {
      const categoryItem = req.body;
      const { name } = categoryItem;

      if (!name) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newCategoryItem =
        await categoriesService.createCategory(categoryItem);

      res.status(201).send(newCategoryItem);
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }

  async updateOne(req, res) {
    try {
      const id = Number(req.params.id);
      const paramsToUpdate = req.body;

      const updatedCategoryItem = await categoriesService.updateCategory(
        id,
        paramsToUpdate,
      );

      if (!updatedCategoryItem) {
        res.status(404).send({ message: 'Category not found' });

        return;
      }

      res.status(200).send(updatedCategoryItem);
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }

  async deleteOne(req, res) {
    try {
      const id = Number(req.params.id);

      const isDeleted = await categoriesService.deleteCategory(id);

      if (!isDeleted) {
        res.status(404).send({ message: 'Category not found' });

        return;
      }

      res.status(204).send();
    } catch (err) {
      res.status(500).send({ message: 'Server error', error: err.message });
    }
  }
}

const categoriesController = new CategoriesController();

module.exports = categoriesController;
