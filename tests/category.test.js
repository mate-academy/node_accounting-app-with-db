'use strict';

const { sequelize } = require('../src/db');
const { models } = require('../src/models/models');

describe('Category Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await models.Category.destroy({ where: {} });
  });

  test('should create a category with valid data', async () => {
    const categoryData = {
      name: 'Test Category',
      description: 'Test Description',
      color: '#FF0000',
    };

    const category = await models.Category.create(categoryData);

    expect(category.id).toBeDefined();
    expect(category.name).toBe(categoryData.name);
    expect(category.description).toBe(categoryData.description);
    expect(category.color).toBe(categoryData.color);
    expect(category.isActive).toBe(true);
    expect(category.createdAt).toBeDefined();
    expect(category.updatedAt).toBeDefined();
  });

  test('should not create category without name', async () => {
    const categoryData = {
      description: 'Test Description',
      color: '#FF0000',
    };

    await expect(models.Category.create(categoryData))
      .rejects
      .toThrow();
  });

  test('should not create category with duplicate name', async () => {
    const categoryData = {
      name: 'Test Category',
      description: 'Test Description',
    };

    await models.Category.create(categoryData);

    await expect(models.Category.create(categoryData))
      .rejects
      .toThrow();
  });

  test('should update category', async () => {
    const category = await models.Category.create({
      name: 'Original Name',
      description: 'Original Description',
    });

    const updatedCategory = await category.update({
      name: 'Updated Name',
      description: 'Updated Description',
    });

    expect(updatedCategory.name).toBe('Updated Name');
    expect(updatedCategory.description).toBe('Updated Description');
  });

  test('should delete category', async () => {
    const category = await models.Category.create({
      name: 'To Delete',
      description: 'Will be deleted',
    });

    const categoryId = category.id;
    await category.destroy();

    const deletedCategory = await models.Category.findByPk(categoryId);
    expect(deletedCategory).toBeNull();
  });
});
