module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignoreNumericLiteralTypes: true,
        ignoreEnums: true,
        enforceConst: true,
        ignoreReadonlyClassProperties: true,
        ignore: [-1, 0, 1]
      }
    ] // Disallows magic numbers
  }
}
