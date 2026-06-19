'use strict';

const request = require('supertest');
const { syncModels, Category } = require('../src/models/models');
const { createServer } = require('../src/createServer');
const { sequelize } = require('../src/db');

describe('Category CRUD', () => {
  const app = createServer();

  beforeAll(async() => {
    await syncModels();
  });

  afterAll(async() => {
    await sequelize.close();
  });

  beforeEach(async() => {
    await Category.destroy({ where: {} });
  });

  describe('GET /categories', () => {
    test('should return empty array when no categories', async() => {
      const response = await request(app).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('should return all categories', async() => {
      await Category.create({ name: 'Food' });
      await Category.create({ name: 'Transport' });

      const response = await request(app).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('name', 'Food');
      expect(response.body[1]).toHaveProperty('name', 'Transport');
    });
  });

  describe('GET /categories/:id', () => {
    test('should return 404 when category does not exist', async() => {
      const response = await request(app).get('/categories/999');

      expect(response.status).toBe(404);
    });

    test('should return category by id', async() => {
      const category = await Category.create({ name: 'Food' });

      const response = await request(app).get(`/categories/${category.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', category.id);
      expect(response.body).toHaveProperty('name', 'Food');
    });
  });

  describe('POST /categories', () => {
    test('should create a new category', async() => {
      const response = await request(app)
        .post('/categories')
        .send({ name: 'Food' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'Food');

      const categoriesInDb = await Category.findAll();

      expect(categoriesInDb).toHaveLength(1);
    });
  });

  describe('PATCH /categories/:id', () => {
    test('should return 404 when category does not exist', async() => {
      const response = await request(app)
        .patch('/categories/999')
        .send({ name: 'Updated' });

      expect(response.status).toBe(404);
    });

    test('should update category', async() => {
      const category = await Category.create({ name: 'Food' });

      const response = await request(app)
        .patch(`/categories/${category.id}`)
        .send({ name: 'Groceries' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', category.id);
      expect(response.body).toHaveProperty('name', 'Groceries');

      const updatedCategory = await Category.findByPk(category.id);

      expect(updatedCategory.name).toBe('Groceries');
    });
  });

  describe('DELETE /categories/:id', () => {
    test('should return 404 when category does not exist', async() => {
      const response = await request(app).delete('/categories/999');

      expect(response.status).toBe(404);
    });

    test('should delete category', async() => {
      const category = await Category.create({ name: 'Food' });

      const response = await request(app).delete(`/categories/${category.id}`);

      expect(response.status).toBe(204);

      const categoriesInDb = await Category.findAll();

      expect(categoriesInDb).toHaveLength(0);
    });
  });
});
