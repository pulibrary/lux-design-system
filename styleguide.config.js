module.exports = {
  // set your styleguidist configuration here
  title: "LUX Style Guide",
  components: "src/components/**/[A-Z]*.vue",
  defaultExample: true,
  pagePerSection: true,
  sections: [
    {
      name: "Components",
      components: "src/components/[A-Z]*.vue",
    },
    {
      name: "Icons",
      components: "src/components/icons/[A-Z]*.vue",
    },
  ],
  exampleMode: "expand",
}
