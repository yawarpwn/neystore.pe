// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  singleQuote: true,
  semi: false,
  jsxSingleQuote: true,
  htmlWhitespaceSensitivity: 'strict',
  singleAttributePerLine: true,
  overrides: [
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
