'use strict';

const axios = require('axios');
const https = require('https');
const {
  models: { User },
} = require('../src/models/models');
const { createServer } = require('../src/createServer');
const { sequelize } = require('../src/db');
const { Agent } = require('http');

axios.defaults.httpAgent = new Agent({ keepAlive: false });

describe('User', () => {
  let serverInstance;
  let api;

  const HOST = 'http://localhost:7080/';

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    api = axios.create({
      baseURL: HOST,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
  });

  beforeEach(async () => {
    const server = createServer();

    serverInstance = server.listen(7080);

    await User.destroy({ truncate: true, cascade: true });
  });

  afterEach(async () => {
    if (serverInstance) {
      await serverInstance.close();
    }
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const name = 'John Doe';
      const { data: user } = await api.post('/users', { name });

      expect(user).toEqual(expect.objectContaining({ name }));
    });

    it('should return 400 if name missing', async () => {
      await expect(api.post('/users')).rejects.toHaveProperty(
        'response.status',
        400,
      );
    });
  });
});
