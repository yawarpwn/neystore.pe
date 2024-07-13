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
  htmlWhitespaceSensitivity: 'strict',
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
        printWidth: 120,
        bracketSameLine: true,
        singleAttributePerLine: true,
      },
    },
  ],
}
