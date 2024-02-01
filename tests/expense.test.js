'use strict';

const { createServer } = require('../src/createServer');
const { sequelize } = require('../src/db');
const axios = require('axios');
const https = require('https');
const { models } = require('../src/models/models');
const { User } = require('../src/models/User.model');

describe('Expense', () => {
  let server;
  let serverInstance;
  let axiosInstance;
  let user = null;

  const HOST = 'http://localhost:7080/';

  beforeAll(async() => {
    await sequelize.sync({ force: true });

    axiosInstance = axios.create({
      baseURL: HOST,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  });

  beforeEach(async() => {
    server = createServer();

    serverInstance = server.listen(7080, () => {
      // eslint-disable-next-line no-console
      console.log(HOST);
    });

    await Promise.all(models.map((model) => model.destroy({ truncate: true })));

    user = await User.create({ name: 'John Doe' });
  });

  afterEach(async() => {
    if (serverInstance) {
      await serverInstance.close();
    }
  });

  afterAll(async() => {
    await sequelize.close();
  });

  describe('createExpense', () => {
    it('should create a new expense', async() => {
      const expenseData = {
        userId: user.id,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const response = await axiosInstance
        .post('expenses', expenseData);

      expect(response.status).toBe(201);

      expect(response.headers['content-type'])
        .toBe('application/json; charset=utf-8');

      expect(response.data)
        .toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            ...expenseData,
          }),
        );
    });

    it('should return 400 if required fields is not provided', async() => {
      expect.assertions(1);

      try {
        await axiosInstance.post('/expenses', {});
      } catch (err) {
        expect(err.response.status).toBe(400);
      }
    });

    it('should return 400 if user not found', async() => {
      expect.assertions(1);

      const expenseData = {
        userId: 0,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      try {
        await axiosInstance.post('expenses', expenseData);
      } catch (err) {
        expect(err.response.status).toBe(400);
      }
    });
  });

  describe('getExpenses', () => {
    it('should return empty array if no expenses', async() => {
      const response = await axiosInstance.get('expenses');

      expect(response.status).toBe(200);

      expect(response.data)
        .toStrictEqual([]);
    });

    it('should return all expenses', async() => {
      const expenseData = {
        userId: user.id,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post('expenses', expenseData);

      const response = await axiosInstance.get('expenses');

      expect(response.data)
        .toEqual([
          {
            id: expenseId,
            ...expenseData,
          },
        ]);
    });

    it('should return all expenses for a user', async() => {
      const { data: { id: userId2 } } = await axiosInstance
        .post('users', { name: 'Jane Doe' });

      const expenseData = {
        userId: user.id,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post('expenses', expenseData);

      await axiosInstance
        .post('expenses', {
          ...expenseData,
          userId: userId2,
        });

      const response = await axiosInstance
        .get(`expenses?userId=${user.id}`);

      expect(response.data)
        .toEqual([
          {
            id: expenseId,
            ...expenseData,
          },
        ]);
    });

    it('should return all expenses between dates', async() => {
      const expenseData = {
        userId: user.id,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post('expenses', expenseData);

      const { data: { id: secondExpenseId } } = await axiosInstance
        .post('expenses', {
          ...expenseData, spentAt: '2022-10-20T11:01:43.462Z',
        });

      const response = await axiosInstance
        // eslint-disable-next-line max-len
        .get('expenses?&from=2022-10-19T11:01:43.462Z&to=2022-10-20T11:01:43.462Z');

      expect(response.data)
        .toEqual([
          {
            id: expenseId,
            ...expenseData,
          },
          {
            id: secondExpenseId,
            ...expenseData,
            spentAt: '2022-10-20T11:01:43.462Z',
          },
        ]);
    });

    it('should return all expenses by category', async() => {
      const expenseData = {
        userId: user.id,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post('expenses', expenseData);

      await axiosInstance
        .post('/expenses', {
          ...expenseData,
          category: 'Food',
        });

      const response = await axiosInstance
        .get(`expenses?userId=${user.id}&categories=Electronics`);

      expect(response.data)
        .toEqual([
          {
            id: expenseId,
            ...expenseData,
          },
        ]);
    });
  });

  describe('getExpense', () => {
    it('should return expense', async() => {
      const expenseData = {
        userId: user.id,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post('expenses', expenseData);

      const response = await axiosInstance
        .get(`expenses/${expenseId}`);

      expect(response.data)
        .toEqual({
          id: expenseId,
          ...expenseData,
        });
    });

    it('should return 404 if expense not found', async() => {
      expect.assertions(1);

      try {
        await axiosInstance.get('expenses/1');
      } catch (err) {
        expect(err.response.status).toBe(404);
      }
    });
  });

  describe('updateExpense', () => {
    it('should update expense', async() => {
      const expenseData = {
        userId: user.id,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post('expenses', expenseData);

      const response = await axiosInstance
        .patch(`expenses/${expenseId}`, { title: 'Buy a new TV' });

      expect(response.data)
        .toEqual({
          id: expenseId,
          ...expenseData,
          title: 'Buy a new TV',
        });
    });

    it('should return 404 if expense not found', async() => {
      expect.assertions(1);

      await axiosInstance.patch('expenses/1', {})
        .catch((err) => {
          expect(err.response.status).toBe(404);
        });
    });
  });

  describe('deleteExpense', () => {
    it('should delete expense', async() => {
      expect.assertions(2);

      const expenseData = {
        userId: user.id,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post('expenses', expenseData);

      const res = await axiosInstance
        .delete(`expenses/${expenseId}`);

      expect(res.status).toBe(204);

      await axiosInstance
        .get(`expenses/${expenseId}`)
        .catch((err) => {
          expect(err.response.status).toBe(404);
        });
    });

    it('should return 404 if expense not found', async() => {
      await axiosInstance.delete('expenses/1')
        .catch((err) => {
          expect(err.response.status).toBe(404);
        });
    });
  });
});
