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
    res.status(404).send('Category not found');

    return;
  }

  res.status(200).send(foundCategory);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Fill required fileds');

    return;
  }

  const newCategory = await categoryService.create(name);

  res.status(201).send(newCategory);
};

const update = async(req, res) => {
  const { categoryId } = req.params;
  const foundCategory = await categoryService.getById(categoryId);

  if (!foundCategory) {
    res.status(404).end('User not found');

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400).send('No name to update');

    return;
  }

  const updatedCategory = await categoryService.update(categoryId, name);

  res.status(200).send(updatedCategory);
};

const remove = async(req, res) => {
  const { categoryId } = req.params;
  const foundCategory = await categoryService.getById(categoryId);

  if (!foundCategory) {
    res.status(404).send('User not found');

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
