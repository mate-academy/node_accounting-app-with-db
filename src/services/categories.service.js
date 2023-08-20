import { Category } from '../models/Category.js';

async function getAll() {
  const categories = await Category.findAll();
  return categories;
}

async function getOne(id) {
  return Category.findByPk(id, {
    attributes: ['id', 'name'],
  });
}

async function createOne(name) {
  const newCategory = await Category.create({
    name,
  });

  return { id: newCategory.id, name: newCategory.name };
}

async function updateOne(id, name) {
  const updatedCategory = await Category.update(
    {
      name,
    },
    {
      where: { id },
      returning: ['id', 'name'],
    },
  );

  return updatedCategory[1][0];
}

async function deleteOne(id) {
  return Category.destroy({
    where: { id },
  });
}

export { getAll, getOne, createOne, updateOne, deleteOne };
