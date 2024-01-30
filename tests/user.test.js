/* eslint-disable no-console */
'use strict';

const axios = require('axios');
const https = require('https');

const { models } = require('../src/models/models');
const { createServer } = require('../src/createServer');
const { sequelize } = require('../src/db');

describe('User', () => {
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
  }, 7000);

  beforeEach(async() => {
    server = createServer();

    serverInstance = server.listen(7080, () => {
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

  describe('createUser', () => {
    it('should create a new user', async() => {
      const name = 'John Doe';

      const res = await axiosInstance.post(`${HOST}/users`, { name });

      expect(res.status).toEqual(201);

      expect(res.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(res.data)
        .toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name,
          }),
        );
    });

    it('should return 400 if name is not provided', async() => {
      expect.assertions(1);

      try {
        await axiosInstance.post(`${HOST}/users`);
      } catch (err) {
        expect(err.response.status).toEqual(400);
      }
    });
  });

  describe('getUsers', () => {
    it('should return empty array if no users', async() => {
      const response = await axiosInstance.get(`${HOST}/users`);

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual([]);
    });

    it('should return all users', async() => {
      const users = [
        {
          name: 'John Doe',
        },
        {
          name: 'Jane Doe',
        },
      ];

      const createdUsers = await Promise.all(
        users.map(
          async(user) => {
            const res = await axiosInstance.post(`${HOST}/users`, user);

            expect(res.status).toEqual(201);

            expect(res.headers['content-type'])
              .toEqual('application/json; charset=utf-8');

            return res.data;
          },
        ),
      );

      const response = await axiosInstance.get(`${HOST}/users`);

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual(
          expect.arrayContaining(
            createdUsers,
          ),
        );
    });
  });

  describe('getUser', () => {
    it('should return 404 if user does not exist', async() => {
      expect.assertions(1);

      try {
        await axiosInstance.get(`${HOST}/users/1`);
      } catch (err) {
        expect(err.response.status).toEqual(404);
      }
    });

    it('should return user', async() => {
      const name = 'John Doe';

      const createdUser = await axiosInstance.post(`${HOST}/users`, { name });

      const response = await axiosInstance
        .get(`${HOST}/users/${createdUser.data.id}`);

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual(
          expect.objectContaining({
            id: createdUser.data.id,
            name,
          }),
        );
    });
  });

  describe('updateUser', () => {
    it('should return 404 if user does not exist', async() => {
      expect.assertions(1);

      try {
        await axiosInstance.put(`${HOST}/users/1`, { name: 'John Doe' });
      } catch (err) {
        expect(err.response.status).toEqual(404);
      }
    });

    it('should update user', async() => {
      const name = 'John Doe';

      const createdUser = await axiosInstance.post(`${HOST}/users`, { name });

      const newName = 'Jane Doe';

      const response = await axiosInstance
        .patch(`${HOST}/users/${createdUser.data.id}`, { name: newName });

      expect(response.status).toEqual(200);

      expect(response.headers['content-type'])
        .toEqual('application/json; charset=utf-8');

      expect(response.data)
        .toEqual(
          expect.objectContaining({
            id: createdUser.data.id,
            name: newName,
          }),
        );
    });
  });

  describe('deleteUser', () => {
    it('should return 404 if user does not exist', async() => {
      expect.assertions(1);

      try {
        await axiosInstance.delete(`${HOST}/users/1'`);
      } catch (err) {
        expect(err.response.status).toEqual(404);
      }
    });

    it('should delete user', async() => {
      const name = 'John Doe';

      const createdUser = await axiosInstance.post(`${HOST}/users`, { name });

      const res = await axiosInstance
        .delete(`${HOST}/users/${createdUser.data.id}`);

      expect(res.status).toEqual(204);

      try {
        await axiosInstance
          .get(`${HOST}/users/${createdUser.data.id}`);
      } catch (err) {
        expect(err.response.status).toEqual(404);
      }
    });
  });
});
