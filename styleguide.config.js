const path = require("path")

module.exports = {
  // set your styleguidist configuration here
  title: "LUX Style Guide",
  components: "src/components/**/[A-Z]*.vue",
  defaultExample: true,
  pagePerSection: true,
  sections: [
    {
      name: "Design Tokens",
      content: "docs/design_tokens.md",
    },
    {
      name: "Components",
      components: "src/components/[A-Z]*.vue",
    },
    {
      name: "Icons",
      components: "src/components/icons/[A-Z]*.vue",
    },
    {
      name: "Logos",
      components: "src/components/logos/[A-Z]*.vue",
    },
    {
      name: "Internal Components",
      components: "src/components/_*.vue",
    },
  ],
  exampleMode: "expand",
  enhancePreviewApp: path.join(__dirname, "styleguide_vue_app.js"),
  version: process.env.npm_package_version,
  theme: {
    fontFamily: {
      base: "var(--font-family-text)",
    },
    color: {
      light: "var(--color-grayscale-dark)",
      sidebarBackground: "var(--color-grayscale-lighter)",
      link: "var(--color-bleu-de-france)",
      codeBackground: "var(--color-grayscale-lighter)",
      codeKeyword: "var(--color-bleu-de-france-darker)",
      codePunctuation: "var(--color-bleu-de-france-darker)",
      codeProperty: "var(--color-gray-100)",
      codeString: "var(--color-red)",
    },
  },
  styles: {
    Heading: {
      heading2: {
        fontFamily: "var(--font-family-heading)",
        fontWeight: "var(--font-weight-bold)",
        lineHeight: "var(--line-height-heading)",
      },
    },
  },
  template: {
    lang: "en",
  },
}
