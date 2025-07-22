const categoryService = require('../services/categoryService');

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();

      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createCategory(req, res) {
    try {
      const category = await categoryService.createCategory(req.body);

      res.status(201).json(category);
    } catch (error) {
      if (
        error.message === 'Required fields missing' ||
        error.message === 'Category name already exists'
      ) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getCategoryById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const category = await categoryService.getCategoryById(id);

      res.json(category);
    } catch (error) {
      if (error.message === 'Category not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const id = parseInt(req.params.id);
      const category = await categoryService.updateCategory(id, req.body);

      res.json(category);
    } catch (error) {
      if (error.message === 'Category not found') {
        return res.status(404).json({ error: error.message });
      }

      if (error.message === 'Category name already exists') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const id = parseInt(req.params.id);

      await categoryService.deleteCategory(id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Category not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CategoryController();
