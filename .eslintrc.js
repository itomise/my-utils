module.exports = {
  ignorePatterns: ['!.eslintrc.js', '!.babelrc.js'],
  // extends: [
  //   'eslint:recommended',
  //   'plugin:prettier/recommended',
  // ],
  extends: ['plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    quotes: ['error', 'single'],
    // 'prettier/prettier': 0,
  },
}
