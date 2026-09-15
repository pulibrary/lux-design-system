const path = require("path")

module.exports = {
  // set your styleguidist configuration here
  title: "LUX Style Guide",
  components: "src/components/**/[A-Z]*.vue",
  defaultExample: true,
  pagePerSection: true,
  sections: [
    {
      name: "Adding Lux to Your Project",
      content: "docs/adding_lux.md",
    },
    {
      name: "Design Principles",
      content: "docs/design_principles.md",
    },
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
    {
      name: "Adding Icons",
      content: "docs/adding_icons.md",
    },
  ],
  exampleMode: "expand",
  enhancePreviewApp: path.join(__dirname, "styleguide_vue_app.js"),
  version: process.env.npm_package_version,
  require: [path.join(__dirname, "src/assets/styles/variables.css")],
  theme: {
    fontFamily: {
      base: "var(--font-family-text)",
    },
    color: {
      light: "var(--color-grayscale-dark)",
      sidebarBackground: "var(--color-grayscale-lighter)",
      link: "var(--color-bleu-de-france)",
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
  editorConfig: {
    screenReaderLabel: "Code example editor",
    theme: "abcdef",
  },
  simpleEditor: false,
}
