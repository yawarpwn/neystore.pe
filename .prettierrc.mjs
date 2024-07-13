/** @type {import("prettier").Config} */

export default {
  printWidth: 100,
  plugins: ['prettier-plugin-astro'],
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  useTabs: true,
  trailingComma: 'es5',
  jsxSingleQuote: false,
  htmlWhitespaceSensitivity: 'ignore',
  singleAttributePerLine: true,
  overrides: [
    {
      files: ['.*', '*.md', '*.toml', '*.yml'],
      options: {
        useTabs: false,
      },
    },
    {
      files: '*.astro',
      options: {
        parser: 'astro',
        astroAllowShorthand: true,
        printWidth: 100,
        bracketSameLine: true,
        singleAttributePerLine: false,
      },
    },
  ],
}
