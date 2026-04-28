const categoryService = require('../services/category.service');

class CategoryController {
  get = async (req, res) => {
    const categories = await categoryService.getAll();

    res.status(200).json(categories);
  };

  getOne = async (req, res) => {
    const id = Number(req.params.id);
    const category = await categoryService.getById(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    res.status(200).json(category);
  };

  create = async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    const newCategory = await categoryService.create({
      name,
      description: description ?? '',
    });

    res.status(201).json(newCategory);
  };

  update = async (req, res) => {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).send({ message: 'Name is required' });
    }

    const category = await categoryService.getById(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    const updatedCategory = await categoryService.update(id, {
      name,
      description,
    });

    res.status(200).json(updatedCategory);
  };

  remove = async (req, res) => {
    const id = Number(req.params.id);
    const category = await categoryService.getById(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    await categoryService.remove(id);
    res.sendStatus(204);
  };
}
module.exports = new CategoryController();
