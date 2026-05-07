const categoryService = require('../services/category.service');
const expenseService = require('../services/expense.service');

const get = async (req, res) => {
  res.status(200).send(await categoryService.getCategories());
};

const getById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategory(id);

  if (!category) {
    return res.status(404).send({ message: 'Category not found' });
  }

  res.status(200).send(category);
};

const create = async (req, res) => {
  const { expenseId, title } = req.body;

  if (
    typeof expenseId !== 'number' ||
    !expenseId ||
    typeof title !== 'string' ||
    !title
  ) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const isExpense = await expenseService.getExpense(expenseId);

  if (!isExpense) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const newCategory = await categoryService.createCategory({
    expenseId,
    title,
  });

  res.status(201).send(newCategory);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategory(id);

  if (!category) {
    return res.status(404).send({ message: 'Category not found' });
  }
  await categoryService.deleteCategory(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { expenseId, title } = req.body;
  const category = await categoryService.getCategory(id);

  if (!category) {
    return res.status(404).send({ message: 'Category not found' });
  }

  if (
    (expenseId !== undefined && typeof expenseId !== 'number') ||
    (title !== undefined && typeof title !== 'string')
  ) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const updatedCategory = await categoryService.updateCategory({
    id,
    expenseId,
    title,
  });

  res.status(200).send(updatedCategory);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
