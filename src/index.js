'use strict';

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.end('hey bro!');
});

app.listen(8000);
