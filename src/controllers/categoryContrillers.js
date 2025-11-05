const categoryService = require('../service/categoryService');

const getAllCats = async (req, res) => {
  try {
    const cats = await categoryService.getAll();

    res.status(200).json(cats);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCatById = async (req, res) => {
  const { id } = req.params;

  try {
    const catById = await categoryService.getById(id);

    if (!catById) {
      return res.status(404).send('Category not found');
    }

    res.status(200).send(catById);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const addCat = async (req, res) => {
  const { name } = req.body;

  try {
    const newCats = await categoryService.create(name);

    res.status(201).json(newCats);
  } catch (error) {
    res.status(500).send('Category not added!');
  }
};

const updateCat = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const updated = await categoryService.update(name, id);

    if (updated === null) {
      return res.status(404).send('cat for update not found');
    }

    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

const removeCat = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await categoryService.remove(id);

    if (deletedCount === 0) {
      return res.status(404).send('category not exist!');
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getAllCats,
  getCatById,
  addCat,
  updateCat,
  removeCat,
};
