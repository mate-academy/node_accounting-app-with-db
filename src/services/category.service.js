const { Category } = require('../models/Category.model');

class CategoryService {
  getAll = () => Category.findAll();
  getById = (id) => Category.findByPk(id);
  create = (categoryData) => Category.create(categoryData);

  update = async (id, categoryData) => {
    await Category.update(categoryData, { where: { id } });

    return this.getById(id);
  };

  remove = (id) => Category.destroy({ where: { id } });
}

module.exports = new CategoryService();
