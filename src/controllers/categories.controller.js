import * as categoryService from '../services/categories.service.js';
import pkg from 'http-errors';

const { NotFound } = pkg;

const getAllCategories = async(req, res, next) => {
  try {
    const categories = await categoryService.getAll();

    res.send(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async(req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await categoryService.getOne(categoryId);

    if (!category) {
      next(new NotFound('Category not found'));
    }

    res.send(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async(req, res, next) => {
  const { name } = req.body;

  try {
    const newCategory = await categoryService.createOne(name);

    res.status(201).send(newCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async(req, res, next) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await categoryService.updateOne(categoryId, name);

    res.send(updatedCategory);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async(req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await categoryService.getOne(categoryId);

    if (!category) {
      next(new NotFound('Category not found'));
    }

    await categoryService.deleteOne(categoryId);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
