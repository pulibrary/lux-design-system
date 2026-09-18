import { defineConfig } from "vitepress"
import fs from "fs"
import path from "path"

export const vueDocsPlugin = {
  name: "vue-docs",
  transform(code, id) {
    if (!/vue&type=docs/.test(id)) return
    return `export default ''`
  },
}

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
      return { text: name, link: name } // Follows the VitePress sidebar link contract
    })
    .sort((a, b) => a.text.localeCompare(b.text))
}

export default defineConfig({
  title: "LUX Design System",
  description: "PUL design system",
  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        base: "/",
        items: [
          { text: "Adding Lux to Your Project", link: "adding_lux" },
          { text: "Adding Icons", link: "adding_icons" },
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
