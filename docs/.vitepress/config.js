import { defineConfig } from "vitepress"
import fs from "fs"
import path from "path"

const projectRoot = process.cwd()
const componentsDir = path.resolve(projectRoot, "src/components")

function getComponentItems(subDir = "") {
  const targetDir = path.join(componentsDir, subDir)
  if (!fs.existsSync(targetDir)) return []

  return fs
    .readdirSync(targetDir, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith(".vue"))
    .map(entry => {
      const name = path.basename(entry.name, ".vue")
      return { text: name, link: name }
    })
    .sort((a, b) => a.text.localeCompare(b.text))
}

export const vueDocsPlugin = {
  name: "vue-docs",
  transform(code, id) {
    if (!/vue&type=docs/.test(id)) return
    return `export default ''`
  },
}

export default defineConfig({
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
        items: getComponentItems(""),
      },
      {
        text: "Icons",
        base: "/src/components/icons/",
        items: getComponentItems("icons"),
      },
      {
        text: "Logos",
        base: "/src/components/logos/",
        items: getComponentItems("logos"),
      },
    ],
  },
})
