import fs from "fs"
import path from "path"

const projectRoot = process.cwd()
const componentsDir = path.resolve(projectRoot, "src/components")
const themeFile = path.resolve(projectRoot, "docs/.vitepress/theme/index.js")

const styleImports = [
  "../../../src/assets/styles/style.scss",
  "../../../src/assets/styles/spacing.scss",
  "../../../src/assets/styles/system.scss",
  "../../../src/assets/styles/mixins.scss",
  "../../../src/assets/styles/variables.css",
]

function getVueFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Components directory does not exist: ${dir}`)
    return []
  }

  const results = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      results.push(...getVueFiles(fullPath))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".vue")) {
      results.push(fullPath)
    }
  }

  return results
}

function toImportPath(filePath) {
  const relativePath = path.relative(path.dirname(themeFile), filePath)

  return relativePath
    .split(path.sep)
    .join("/")
    .replace(/^([^./])/, "./$1")
}

function generateThemeFile(componentFiles) {
  const imports = [
    'import DefaultTheme from "vitepress/theme"',
    ...styleImports.map(file => `import "${file}"`),
    ...componentFiles.map(file => {
      const componentName = path.basename(file, path.extname(file))
      const importPath = toImportPath(file)

      return `import ${componentName} from "${importPath}"`
    }),
  ]

  const registrations = componentFiles.map(file => {
    const componentName = path.basename(file, path.extname(file))

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

function main() {
  console.log(`Scanning: ${componentsDir}`)

  const componentFiles = getVueFiles(componentsDir).sort((a, b) => a.localeCompare(b))

  fs.mkdirSync(path.dirname(themeFile), { recursive: true })

  fs.writeFileSync(themeFile, generateThemeFile(componentFiles), "utf8")

  console.log(
    `Generated ${path.relative(projectRoot, themeFile)} with ${componentFiles.length} components`
  )
}

main()
