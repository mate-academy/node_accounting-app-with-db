'use strict';

module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    jest: true,
  },
  rules: {
    'no-proto': 0,
    'object-curly-newline': 'off',
    'no-shadow': 'off',
  },
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 13,
  },
};
