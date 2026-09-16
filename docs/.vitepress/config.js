export const vueDocsPlugin = {
  name: "vue-docs",
  transform(code, id) {
    if (!/vue&type=docs/.test(id)) return
    return `export default ''`
  },
}

export default {
  title: "LUX Design System",
  description: "PUL design system",
  vite: {
    plugins: [vueDocsPlugin],
  },
  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        base: "/",
        items: [
          { text: "Adding Lux to Your Project", link: "adding_lux" },
          { text: "Adding Icons", link: "adding_icons" },
          { text: "Design Principles", link: "design_principles" },
          { text: "Design Tokens", link: "design_tokens" },
          { text: "Lux Usage", link: "lux_usage" },
        ],
      },
      {
        text: "Components",
        base: "/src/components/",
        items: [
          { text: "LuxAlert", link: "LuxAlert" },
          { text: "LuxAutocompleteInput", link: "LuxAutocompleteInput" },
          { text: "LuxBadge", link: "LuxBadge" },
          { text: "LuxBanner", link: "LuxBanner" },
          { text: "LuxCard", link: "LuxCard" },
          { text: "LuxCopyToClipboard", link: "LuxCopyToClipboard" },
          { text: "LuxDataTable", link: "LuxDataTable" },
          { text: "LuxDatePicker", link: "LuxDatePicker" },
          { text: "LuxDialog", link: "LuxDialog" },
          { text: "LuxDropdownMenu", link: "LuxDropdownMenu" },
          { text: "LuxGridContainer", link: "LuxGridContainer" },
          { text: "LuxGridItem", link: "LuxGridItem" },
          { text: "LuxHeading", link: "LuxHeading" },
          { text: "LuxHyperlink", link: "LuxHyperlink" },
          { text: "LuxInputAsyncSelect", link: "LuxInputAsyncSelect" },
          { text: "LuxInputCheckbox", link: "LuxInputCheckbox" },
          { text: "LuxInputMultiselect", link: "LuxInputMultiselect" },
          { text: "LuxInputRadio", link: "LuxInputRadio" },
          { text: "LuxInputSelect", link: "LuxInputSelect" },
          { text: "LuxInputText", link: "LuxInputText" },
        ],
      },
    ],
  },
}
