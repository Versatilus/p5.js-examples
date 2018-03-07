module.exports = {
  env: {
    browser: true,
    amd: true,
    es6: true
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    'no-cond-assign': [2, 'except-parens'],
    eqeqeq: ['error', 'smart'],
    'no-use-before-define': [
      2,
      {
        functions: false
      }
    ],
    'new-cap': 0,
    'no-caller': 2,
    'no-undef': 2,
    'no-unused-vars': ['error', { args: 'none' }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-console': 'off'
  }
};
