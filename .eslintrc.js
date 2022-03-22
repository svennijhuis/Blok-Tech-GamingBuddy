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
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "prefer-template": 2,
    "no-multiple-empty-lines": [2, { max: 3, maxBOF: 0 }]
  },
  globals: {
    io: "readonly",
    Qs: "readonly"
  }
};
