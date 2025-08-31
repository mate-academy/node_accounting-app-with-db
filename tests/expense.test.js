'use strict';

const { createServer } = require('../src/createServer');
const { sequelize } = require('../src/db');
const axios = require('axios');
const https = require('https');
const {
  models: { User, Expense },
} = require('../src/models/models');
const { Agent } = require('http');

axios.defaults.httpAgent = new Agent({ keepAlive: false });

describe('Expense', () => {
  let serverInstance;
  let api;
  let user, secondUser;

  const HOST = 'http://localhost:7080/';

  const laptop = {
    spentAt: '2022-10-19T11:01:43.462Z',
    title: 'Buy a new laptop',
    amount: 999,
    category: 'Electronics',
    note: 'I need a new laptop',
  };

  const tv = {
    spentAt: '2022-10-19T11:01:43.462Z',
    title: 'Buy a new TV',
    amount: 999,
    category: 'Electronics',
    note: 'I need a new TV',
  };

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    api = axios.create({
      baseURL: HOST,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    [user, secondUser] = await Promise.all([
      User.create({ name: 'John Doe' }),
      User.create({ name: 'Jane Doe' }),
    ]);
  });

  beforeEach(async () => {
    const server = createServer();

    serverInstance = server.listen(7080);

    await Expense.destroy({ truncate: true, cascade: true });
  });

  afterEach(async () => {
    if (serverInstance) {
      await serverInstance.close();
    }
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // ================= CREATE =================
  describe('createExpense', () => {
    it('should create a new expense', async () => {
      const data = { ...laptop, userId: user.id };
      const response = await api.post('/expenses', data);

      expect(response.status).toBe(201);
      expect(response.data).toEqual(expect.objectContaining(data));
    });

    it('should return 400 if required fields missing', async () => {
      await expect(
        api.post('/expenses', { note: 'Important note' }),
      ).rejects.toHaveProperty('response.status', 400);
    });

    it('should create expense if optional fields missing', async () => {
      const data = {
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a laptop',
        amount: 999,
        userId: user.id,
        category: 'Electronics',
      };
      const response = await api.post('/expenses', data);

      expect(response.data).toEqual(expect.objectContaining(data));
    });

    it('should return 400 if user not found', async () => {
      const data = { ...laptop, userId: 0 };

      await expect(api.post('/expenses', data)).rejects.toHaveProperty(
        'response.status',
        400,
      );
    });
  });

  // ================= GET =================
  describe('getExpenses', () => {
    it('should return empty array if no expenses', async () => {
      const response = await api.get('/expenses');

      expect(response.data).toEqual([]);
    });

    it('should return all expenses', async () => {
      const { data: exp1 } = await api.post('/expenses', {
        ...tv,
        userId: user.id,
      });
      const response = await api.get('/expenses');

      expect(response.data).toEqual([
        expect.objectContaining({ id: exp1.id, ...tv, userId: user.id }),
      ]);
    });

    it('should return expenses for a user', async () => {
      const { data: exp1 } = await api.post('/expenses', {
        ...laptop,
        userId: user.id,
      });

      await api.post('/expenses', { ...laptop, userId: secondUser.id });

      const response = await api.get(`/expenses?userId=${user.id}`);

      expect(response.data).toEqual([
        expect.objectContaining({ id: exp1.id, ...laptop, userId: user.id }),
      ]);
    });

    it('should return expenses between dates', async () => {
      const { data: exp1 } = await api.post('/expenses', {
        ...tv,
        userId: user.id,
      });
      const { data: exp2 } = await api.post('/expenses', {
        ...laptop,
        spentAt: '2022-10-20T11:01:43.462Z',
        userId: user.id,
      });
      const response = await api.get(
        '/expenses?from=2022-10-19T11:01:43.462Z&to=2022-10-20T11:01:43.462Z',
      );

      expect(response.data).toEqual([
        expect.objectContaining({ id: exp1.id, ...tv, userId: user.id }),
        expect.objectContaining({
          id: exp2.id,
          ...laptop,
          spentAt: '2022-10-20T11:01:43.462Z',
          userId: user.id,
        }),
      ]);
    });

    it('should return expenses by category', async () => {
      const { data: exp1 } = await api.post('/expenses', {
        ...laptop,
        userId: user.id,
      });

      await api.post('/expenses', {
        ...laptop,
        category: 'Food',
        userId: user.id,
      });

      const response = await api.get(
        `/expenses?userId=${user.id}&categories=Electronics`,
      );

      expect(response.data).toEqual([
        expect.objectContaining({ id: exp1.id, ...laptop, userId: user.id }),
      ]);
    });
  });

  // ================= GET SINGLE =================
  describe('getExpense', () => {
    it('should return expense', async () => {
      const { data: exp1 } = await api.post('/expenses', {
        ...tv,
        userId: user.id,
      });
      const response = await api.get(`/expenses/${exp1.id}`);

      expect(response.data).toEqual(
        expect.objectContaining({ id: exp1.id, ...tv, userId: user.id }),
      );
    });

    it('should return 404 if expense not found', async () => {
      await expect(api.get('/expenses/999')).rejects.toHaveProperty(
        'response.status',
        404,
      );
    });
  });

  // ================= UPDATE =================
  describe('updateExpense', () => {
    it('should update expense', async () => {
      const { data: exp1 } = await api.post('/expenses', {
        ...laptop,
        userId: user.id,
      });
      const response = await api.patch(`/expenses/${exp1.id}`, {
        title: 'Buy a new TV',
      });

      expect(response.data).toEqual(
        expect.objectContaining({
          id: exp1.id,
          ...laptop,
          title: 'Buy a new TV',
          userId: user.id,
        }),
      );
    });

    it('should return 404 if expense not found', async () => {
      await expect(api.patch('/expenses/999', laptop)).rejects.toHaveProperty(
        'response.status',
        404,
      );
    });
  });

  // ================= DELETE =================
  describe('deleteExpense', () => {
    it('should delete expense', async () => {
      const { data: exp1 } = await api.post('/expenses', {
        ...tv,
        userId: user.id,
      });
      const res = await api.delete(`/expenses/${exp1.id}`);

      expect(res.status).toBe(204);

      await expect(api.get(`/expenses/${exp1.id}`)).rejects.toHaveProperty(
        'response.status',
        404,
      );
    });

    it('should return 404 if expense not found', async () => {
      await expect(api.delete('/expenses/999')).rejects.toHaveProperty(
        'response.status',
        404,
      );
    });
  });
});
