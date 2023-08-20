module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    jest: true,
  },
  rules: {
    'no-proto': 0,
  },
  plugins: ['jest'],
  'space-before-function-paren': [
    'error',
    {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    },
  ],

  parserOptions: {
    sourceType: 'module',
  },
};
