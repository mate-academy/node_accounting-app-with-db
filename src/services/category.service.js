'use strict';

const { DataTypes } = require('sequelize');

const { sequelize } = require('./db.js');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categories',
  updatedAt: false,
  createdAt: false,
});

const getAll = async() => {
  const result = await Category.findAll({
    order: ['id'],
  });

  return result;
};

const create = (categoryName) => {
  return Category.create({ categoryName });
};

const getById = (id) => {
  return Category.findByPk(id);
};

const remove = async(id) => {
  await Category.destroy({
    where: {
      id,
    },
  });
};

const update = async({ id, categoryName }) => {
  await Category.update({ categoryName }, { where: { id } });

  const updatedCategory = {
    id,
    categoryName,
  };

  return updatedCategory;
};

const checkCategory = async(categoryName) => {
  const currCategory = await Category.findOne({ where: { categoryName } });

  if (!currCategory) {
    await Category.create({ categoryName });
  }
};

module.exports = {
  categoryService: {
    getAll,
    create,
    getById,
    remove,
    update,
    checkCategory,
    Category,
  },
};
