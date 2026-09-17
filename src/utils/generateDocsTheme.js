import fs from "fs"
import path from "path"

const projectRoot = process.cwd()

const componentsDir = path.resolve(projectRoot, "src/components")
const themeFile = path.resolve(projectRoot, "docs/.vitepress/theme/index.js")
const configFile = path.resolve(projectRoot, "docs/.vitepress/config.js")

const styleImports = [
  "../../../src/assets/styles/style.scss",
  "../../../src/assets/styles/spacing.scss",
  "../../../src/assets/styles/system.scss",
  "../../../src/assets/styles/mixins.scss",
  "../../../src/assets/styles/variables.css",
]

function getVueFiles(dir) {
  if (!fs.existsSync(dir)) {
    return []
  }

  const results = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      results.push(...getVueFiles(fullPath))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".vue")) {
      results.push(fullPath)
    }
  }

  return results.sort((a, b) => a.localeCompare(b))
}

function getComponentName(filePath) {
  return path.basename(filePath, ".vue")
}

function getComponentDirectory(filePath) {
  const relativePath = path.relative(componentsDir, filePath)
  const directory = path.dirname(relativePath)

  return directory === "." ? "" : directory
}

function toThemeImportPath(filePath) {
  return path.relative(path.dirname(themeFile), filePath).split(path.sep).join("/")
}

function generateThemeFile(componentFiles) {
  const imports = [
    'import DefaultTheme from "vitepress/theme"',
    ...styleImports.map(file => `import "${file}"`),
    ...componentFiles.map(file => {
      const componentName = getComponentName(file)
      const importPath = toThemeImportPath(file)

      return `import ${componentName} from "${importPath}"`
    }),
  ]

  const registrations = componentFiles.map(file => {
    const componentName = getComponentName(file)

    return `    app.component("${componentName}", ${componentName})`
  })

  return `${imports.join("\n")}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
${registrations.join("\n")}
  },
}
`
}

function escapeString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function createSidebarSection(text, base, componentFiles) {
  const items = componentFiles
    .map(file => {
      const componentName = getComponentName(file)

      return `          { text: "${escapeString(componentName)}", link: "${escapeString(componentName)}" },`
    })
    .join("\n")

  return `      {
        text: "${text}",
        base: "${base}",
        items: [
${items}
        ],
      },`
}

function generateConfigFile(componentFiles) {
  const rootComponents = componentFiles.filter(file => getComponentDirectory(file) === "")

  const iconComponents = componentFiles.filter(file => getComponentDirectory(file) === "icons")

  const logoComponents = componentFiles.filter(file => getComponentDirectory(file) === "logos")

  return `export const vueDocsPlugin = {
  name: "vue-docs",
  transform(code, id) {
    if (!/vue&type=docs/.test(id)) return
    return \`export default ''\`
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
${createSidebarSection("Components", "/src/components/", rootComponents)}
${createSidebarSection("Icons", "/src/components/icons/", iconComponents)}
${createSidebarSection("Logos", "/src/components/logos/", logoComponents)}
    ],
  },
}
`
}

function main() {
  const componentFiles = getVueFiles(componentsDir)

  fs.mkdirSync(path.dirname(themeFile), { recursive: true })

  fs.writeFileSync(themeFile, generateThemeFile(componentFiles), "utf8")

  fs.writeFileSync(configFile, generateConfigFile(componentFiles), "utf8")

  console.log(
    `Generated ${path.relative(projectRoot, themeFile)} with ${componentFiles.length} components`
  )

  console.log(`Generated ${path.relative(projectRoot, configFile)}`)
}

main()
