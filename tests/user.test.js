'use strict';

const supertest = require('supertest');
const { createServer } = require('../src/createServer');

describe('User', () => {
  let server;
  let api;

  beforeEach(() => {
    server = createServer();
    api = supertest(server);
  });

  describe('createUser', () => {
    it('should create a new user', async() => {
      const name = 'John Doe';

      const response = await api
        .post('/users')
        .send({
          name,
        })
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name,
          }),
        );
    });

    it('should return 400 if name is not provided', async() => {
      await api
        .post('/users')
        .send({})
        .expect(400);
    });
  });

  describe('getUsers', () => {
    it('should return empty array if no users', async() => {
      const response = await api
        .get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
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
            const res = await api
              .post('/users')
              .send(user)
              .expect(201)
              .expect('Content-Type', /application\/json/);

            return res.body;
          },
        ),
      );

      const response = await api
        .get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual(
          expect.arrayContaining(
            createdUsers,
          ),
        );
    });
  });

  describe('getUser', () => {
    it('should return 404 if user does not exist', async() => {
      await api
        .get('/users/1')
        .expect(404);
    });

    it('should return user', async() => {
      const name = 'John Doe';

      const createdUser = await api
        .post('/users')
        .send({
          name,
        });

      const response = await api
        .get(`/users/${createdUser.body.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual(
          expect.objectContaining({
            id: createdUser.body.id,
            name,
          }),
        );
    });
  });

  describe('updateUser', () => {
    it('should return 404 if user does not exist', async() => {
      await api
        .put('/users/1')
        .send({
          name: 'John Doe',
        })
        .expect(404);
    });

    it('should update user', async() => {
      const name = 'John Doe';

      const createdUser = await api
        .post('/users')
        .send({
          name,
        });

      const newName = 'Jane Doe';

      const response = await api
        .patch(`/users/${createdUser.body.id}`)
        .send({
          name: newName,
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual(
          expect.objectContaining({
            id: createdUser.body.id,
            name: newName,
          }),
        );
    });
  });

  describe('deleteUser', () => {
    it('should return 404 if user does not exist', async() => {
      await api
        .delete('/users/1')
        .expect(404);
    });

    it('should delete user', async() => {
      const name = 'John Doe';

      const createdUser = await api
        .post('/users')
        .send({
          name,
        });

      await api
        .delete(`/users/${createdUser.body.id}`)
        .expect(204);

      await api
        .get(`/users/${createdUser.body.id}`)
        .expect(404);
    });
  });
});
