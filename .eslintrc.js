module.exports = {
  extends: [
    '@mate-academy/eslint-config',
    '@mate-academy/eslint-config-react'
  ],
  env: {
    jest: true,
    node: true,
    browser: true,
    es2021: true
  },
  rules: {
    'no-proto': 0
  },
  plugins: ['react']
};
