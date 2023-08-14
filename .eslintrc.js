module.exports = {
  extends: "ts-standard",
  env: {
    jest: true
  },
  rules: {
    "no-proto": 0,
    "no-useless-constructor": 0
  },
  plugins: ["jest"],
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
    allowImportExportEverywhere: true
  }
}
