const { Category } = require('../models/Category.model');

class CategoryService {
  async getAllCategories() {
    return Category.findAll();
  }

  async createCategory(categoryData) {
    const { name, description } = categoryData;

    if (!name) {
      throw new Error('Required fields missing');
    }

    try {
      const category = await Category.create({
        name,
        description,
      });

      return category;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Category name already exists');
      }
      throw error;
    }
  }

  async getCategoryById(id) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

  async updateCategory(id, categoryData) {
    const { name, description } = categoryData;
    const category = await Category.findByPk(id);

    if (!category) {
      throw new Error('Category not found');
    }

    try {
      if (name !== undefined) {
        category.name = name;
      }

      if (description !== undefined) {
        category.description = description;
      }

      await category.save();

      return category;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Category name already exists');
      }
      throw error;
    }
  }

  async deleteCategory(id) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new Error('Category not found');
    }

    await category.destroy();

    return true;
  }
}

module.exports = new CategoryService();
