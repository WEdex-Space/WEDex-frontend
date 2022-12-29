/**
 * @link https://www.npmjs.com/package/lint-staged
 */
module.exports = {
  '*.{js,ts,d.ts,tsx}': ['eslint --fix'],
  'packages/*/src/**/*.{css,less,scss,sass,styl}': ['prettier --write', 'stylelint --fix'],
  '*.{json,html,md}': 'prettier --write'
}
