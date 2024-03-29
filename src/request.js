/* eslint-disable no-console */
const axios = require('axios');

axios
  .post('http://localhost:5700/users', { name: 'Bob Roy' })
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
