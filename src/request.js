/* eslint-disable no-console */
const api = require('axios');

const request = async () => {
  const users = [
    {
      name: 'John Doe',
    },
    {
      name: 'Jane Doe',
    },
  ];

  const createdUsers = await Promise.all(
    users.map(async (user) => {
      const res = await api.post('http://localhost:5700/users', user);

      return res.data;
    }),
  );

  const response = await api.get('http://localhost:5700/users');

  console.log(createdUsers);
  console.log(response.data);
};

request();
