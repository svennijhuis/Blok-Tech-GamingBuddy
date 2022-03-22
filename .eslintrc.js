module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    "standard"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    semi: [2, "always"],
    quotes: [2, "double"],
    "prefer-template": 2,
    "no-multiple-empty-lines": [2, { max: 3, maxBOF: 0 }],
    indent: 0
  },
  globals: {
    io: "readonly",
    Qs: "readonly"
  }
};
