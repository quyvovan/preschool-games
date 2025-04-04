module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  jsxSingleQuote: false,
  importOrder: ['^@/', '^[..]', '^[./]'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
