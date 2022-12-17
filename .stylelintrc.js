/**
 * @type import('stylelint').Config
 * @link https://stylelint.io/user-guide/configure
 */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-no-unsupported-browser-features',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'declaration-block-trailing-semicolon': 'always',
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'function-url-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': null, // iconfont
    'plugin/declaration-block-no-ignored-properties': true,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'keyframes-name-pattern': null,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page']
      }
    ]
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
}
