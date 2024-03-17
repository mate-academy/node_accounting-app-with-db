module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    jest: true
  },
  rules: {
    'no-proto': 0,
    'object-curly-newline': 'off',
  },
  plugins: ['jest'],
  parserOptions: {
    "ecmaVersion": 13
  }
};
