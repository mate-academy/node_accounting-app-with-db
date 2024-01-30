'use strict';

const { createServer } = require('../src/createServer');
const { sequelize } = require('../src/db');
const axios = require('axios');
const https = require('https');
const { models } = require('../src/models/models');

describe('Expense', () => {
  let server;
  let serverInstance;
  let axiosInstance;

  const HOST = 'http://localhost:7080';

  beforeAll(async() => {
    await sequelize.sync({ force: true });

    axiosInstance = axios.create({
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
      const { data: { id: userId } } = await axiosInstance.post(
        `${HOST}/users`,
        { name: 'John Doe' },
      );

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const response = await axiosInstance
        .post(`${HOST}/expenses`, expenseData);

      expect(response.status).toEqual(201);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            ...expenseData,
          }),
        );
    });

    it('should return 400 if name is not provided', async() => {
      expect.assertions(1);

      try {
        await axiosInstance.post(`${HOST}/expenses`, {});
      } catch (err) {
        expect(err.response.status).toEqual(400);
      }
    });

    it('should return 400 if user not found', async() => {
      expect.assertions(1);

      const expenseData = {
        userId: 1,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      try {
        await axiosInstance.post(`${HOST}/expenses`, expenseData);
      } catch (err) {
        expect(err.response.status).toEqual(400);
      }
    });
  });

  describe('getExpenses', () => {
    it('should return empty array if no expenses', async() => {
      const response = await axiosInstance.get(`${HOST}/expenses`);

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual([]);
    });

    it('should return all expenses', async() => {
      const { data: { id: userId } } = await axiosInstance.post(
        `${HOST}/users`,
        { name: 'John Doe' },
      );

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post(`${HOST}/expenses`, expenseData);

      const response = await axiosInstance.get(`${HOST}/expenses`);

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual([
          {
            id: expenseId,
            ...expenseData,
          },
        ]);
    });

    it('should return all expenses for a user', async() => {
      const { data: { id: userId } } = await axiosInstance
        .post(`${HOST}/users`, { name: 'John Doe' });

      const { data: { id: userId2 } } = await axiosInstance
        .post(`${HOST}/users`, { name: 'Jane Doe' });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post(`${HOST}/expenses`, expenseData);

      await axiosInstance
        .post(`${HOST}/expenses`, {
          ...expenseData,
          userId: userId2,
        });

      const response = await axiosInstance
        .get(`${HOST}/expenses?userId=${userId}`);

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual([
          {
            id: expenseId,
            ...expenseData,
          },
        ]);
    });

    it('should return all expenses between dates', async() => {
      const { data: { id: userId } } = await axiosInstance
        .post(`${HOST}/users`, { name: 'John Doe' });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post(`${HOST}/expenses`, expenseData);

      await axiosInstance
        .post(`${HOST}/expenses`, {
          ...expenseData, spentAt: '2022-10-20T11:01:43.462Z',
        });

      const response = await axiosInstance
        // eslint-disable-next-line max-len
        .get(`${HOST}/expenses?&from=2022-10-19T00:00:00.000Z&to=2022-10-19T23:59:59.999Z`);

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual([
          {
            id: expenseId,
            ...expenseData,
          },
        ]);
    });

    it('should return all expenses by category', async() => {
      const { data: { id: userId } } = await axiosInstance
        .post(`${HOST}/users`, { name: 'John Doe' });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post(`${HOST}/expenses`, expenseData);

      await axiosInstance
        .post(`${HOST}/expenses`, {
          ...expenseData,
          category: 'Food',
        });

      const response = await axiosInstance
        .get(`${HOST}/expenses?userId=${userId}&categories=Electronics`);

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

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
      const { data: { id: userId } } = await axiosInstance
        .post(`${HOST}/users`, { name: 'John Doe' });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post(`${HOST}/expenses`, expenseData);

      const response = await axiosInstance
        .get(`${HOST}/expenses/${expenseId}`);

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual({
          id: expenseId,
          ...expenseData,
        });
    });

    it('should return 404 if expense not found', async() => {
      expect.assertions(1);

      try {
        await axiosInstance.get(`${HOST}/expenses/1`);
      } catch (err) {
        expect(err.response.status).toEqual(404);
      }
    });
  });

  describe('updateExpense', () => {
    it('should update expense', async() => {
      const { data: { id: userId } } = await axiosInstance
        .post(`${HOST}/users`, { name: 'John Doe' });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post(`${HOST}/expenses`, expenseData);

      const response = await axiosInstance
        .patch(`${HOST}/expenses/${expenseId}`, { title: 'Buy a new TV' });

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual({
          id: expenseId,
          ...expenseData,
          title: 'Buy a new TV',
        });
    });

    it('should return 404 if expense not found', async() => {
      expect.assertions(1);

      await axiosInstance.patch(`${HOST}/expenses/1`, {})
        .catch((err) => {
          expect(err.response.status).toEqual(404);
        });
    });
  });

  describe('deleteExpense', () => {
    it('should delete expense', async() => {
      expect.assertions(2);

      const { data: { id: userId } } = await axiosInstance
        .post(`${HOST}/users`, { name: 'John Doe' });

      const expenseData = {
        userId,
        spentAt: '2022-10-19T11:01:43.462Z',
        title: 'Buy a new laptop',
        amount: 999,
        category: 'Electronics',
        note: 'I need a new laptop',
      };

      const { data: { id: expenseId } } = await axiosInstance
        .post(`${HOST}/expenses`, expenseData);

      const res = await axiosInstance
        .delete(`${HOST}/expenses/${expenseId}`);

      expect(res.status).toEqual(204);

      await axiosInstance
        .get(`${HOST}/expenses/${expenseId}`)
        .catch((err) => {
          expect(err.response.status).toEqual(404);
        });
    });

    it('should return 404 if expense not found', async() => {
      await axiosInstance.delete(`${HOST}/expenses/1`)
        .catch((err) => {
          expect(err.response.status).toEqual(404);
        });
    });
  });
});
