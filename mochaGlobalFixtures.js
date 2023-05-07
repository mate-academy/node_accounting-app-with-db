'use strict';

// eslint-disable-next-line no-shadow
const { expect } = require('expect');

function mochaGlobalSetup() {
  global.expect = expect;
}

module.exports = {
  mochaGlobalSetup,
};
