'use strict';

const categoryService = require('../services/categories.js');

const getAll = async(req, res) => {
  const categories = await categoryService.getAll();

  res.send(categories);
};

const getOne = async(req, res) => {
  const { categoryId } = req.params;
  const foundCategory = await categoryService.getById(categoryId);

  if (!foundCategory) {
    res.statusCode = 404;
    res.send('Category not found');

    return;
  }

  res.statusCode = 200;
  res.send(foundCategory);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send('Fill required fileds');

    return;
  }

  const newCategory = await categoryService.create(name);

  res.statusCode = 201;
  res.send(newCategory);
};

const update = async(req, res) => {
  const { categoryId } = req.params;
  const foundCategory = categoryService.getById(categoryId);

  if (!foundCategory) {
    res.statusCode = 404;
    res.end('User not found');

    return;
  }

  const { name } = req.body;

  const updatedCategory = await categoryService.update(categoryId, name);

  res.send(updatedCategory);
};

const remove = async(req, res) => {
  const { categoryId } = req.params;
  const foundCategory = await categoryService.getById(categoryId);

  if (!foundCategory) {
    res.statusCode = 404;
    res.end('User not found');

    return;
  }

  categoryService.remove(categoryId);

  res.sendStatus(204).send();
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
