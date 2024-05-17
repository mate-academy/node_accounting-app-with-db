'use strict';

const express = require('express');

const createServer = () => {
  return express();
};

module.exports = {
  createServer,
};
