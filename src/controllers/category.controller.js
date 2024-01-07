'use strict';

const { categoryService } = require('../services/category.service.js');

const getAll = async(req, res) => {
  res.send(await categoryService.getAll());
};

const create = async(req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400)
      .send('Request does not have "categoryName" property.');
  }

  const category = await categoryService.create(categoryName);

  res.statusCode = 201;

  res.send(category);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const category = await categoryService.getById(+id);

  if (!category) {
    return res.status(404).send('Category not found');
  }

  res.send(category);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const category = await categoryService.getById(+id);

  if (!category) {
    return res.status(404).send('Category not found');
  }

  await categoryService.remove(+id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  if (!categoryName) {
    return res.status(400)
      .send('Request does not have "categoryName" property.');
  }

  const category = await categoryService.getById(+id);

  if (!category) {
    return res.status(404).send('Category not found');
  }

  const updatedCategory = await categoryService.update({
    id: +id,
    categoryName,
  });

  res.send(updatedCategory);
};

module.exports = {
  categoryController: {
    getAll,
    create,
    getOne,
    remove,
    update,
  },
};
