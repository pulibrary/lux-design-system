import fs from "fs"
import path from "path"
import { parse as parseSFC } from "@vue/compiler-sfc"
import { parse as parseJS } from "@babel/parser"
export class DocsGenerator {
  constructor({
    componentsDir = path.resolve("src/components"),
    assetsDir = path.resolve("src/assets"),
    outputDir = path.resolve("docs/src/components"),
    outputAssetsDir = path.resolve("docs/src/assets"),
  } = {}) {
    this.componentsDir = componentsDir
    this.assetsDir = assetsDir
    this.outputDir = outputDir
    this.outputAssetsDir = outputAssetsDir
  }

  generate() {
    this.copyAssets()

    for (const filePath of this.getVueFiles(this.componentsDir)) {
      this.generateComponentDocs(filePath)
    }
  }

  getVueFiles(dir) {
    if (!fs.existsSync(dir)) return []

    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
      const filePath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        return this.getVueFiles(filePath)
      }

      return entry.isFile() && entry.name.endsWith(".vue") ? [filePath] : []
    })
  }

  copyAssets() {
    if (!fs.existsSync(this.assetsDir)) return

    fs.cpSync(this.assetsDir, this.outputAssetsDir, {
      recursive: true,
      force: true,
    })
  }

  generateComponentDocs(filePath) {
    const source = fs.readFileSync(filePath, "utf8")
    const { descriptor } = parseSFC(source)

    if (!descriptor.scriptSetup) return

    const componentName = path.basename(filePath, ".vue")
    const props = this.extractProps(descriptor.scriptSetup.content)
    const docsBlock = descriptor.customBlocks.find(block => block.type === "docs")

    const outputPath = this.getOutputPath(filePath, componentName)
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })

    fs.writeFileSync(outputPath, this.generateMarkdown(componentName, props, docsBlock?.content))
  }

  getOutputPath(filePath, componentName) {
    const relativePath = path.relative(this.componentsDir, filePath)
    const relativeDir = path.dirname(relativePath)

    return path.join(this.outputDir, relativeDir, `${componentName}.md`)
  }

  extractProps(scriptContent) {
    const ast = parseJS(scriptContent, {
      sourceType: "module",
      plugins: ["jsx"],
      attachComment: true,
    })

    const definePropsCall = ast.program.body
      .flatMap(node => {
        if (node.type === "VariableDeclaration") {
          return node.declarations.map(declaration => declaration.init)
        }

        if (node.type === "ExpressionStatement") {
          return [node.expression]
        }

        return []
      })
      .find(
        expression =>
          expression?.type === "CallExpression" && expression.callee?.name === "defineProps"
      )

    const propsObject = definePropsCall?.arguments[0]

    if (!propsObject || propsObject.type !== "ObjectExpression") {
      return []
    }

    return propsObject.properties
      .filter(property => property.type === "ObjectProperty")
      .map(property => this.extractProp(property, scriptContent))
  }

  extractProp(property, scriptContent) {
    const name = property.key.name || property.key.value
    const description = this.getCleanComment(property)

    let type = "any"
    let defaultValue = "-"

    if (property.value.type === "Identifier") {
      type = property.value.name
    }

    if (property.value.type === "ObjectExpression") {
      for (const attribute of property.value.properties) {
        if (attribute.type !== "ObjectProperty") continue

        const name = attribute.key.name || attribute.key.value

        if (name === "type") {
          type =
            attribute.value.type === "Identifier"
              ? attribute.value.name
              : scriptContent.slice(attribute.value.start, attribute.value.end)
        }

        if (name === "default") {
          defaultValue = scriptContent.slice(attribute.value.start, attribute.value.end)
        }
      }
    }

    return { name, description, type, default: defaultValue }
  }

  getCleanComment(node) {
    if (!node.leadingComments) return "No description provided."

    return node.leadingComments
      .map(comment =>
        comment.value
          .replace(/^\s*\*+\s?/gm, "")
          .replace(/\r?\n/g, " ")
          .trim()
      )
      .join(" ")
  }

  generateMarkdown(componentName, props, docsContent = "") {
    const rows = props
      .map(
        prop =>
          `| \`${prop.name}\` | ${prop.description} | \`${prop.type}\` | \`${prop.default}\` |`
      )
      .join("\n")

    const table = rows || "| - | No props documented for this component. | - | - |"
    let usage = ""
    if (docsContent) {
      usage =
        `\n## Preview\n\n` +
        `${this.unwrapCodeBlocks(docsContent).trim()}\n\n` +
        `###\n\n` +
        `::: details View Source Code\n` +
        `${this.preserveCodeBlocks(docsContent).trim()}\n`
    }

    return `# ${componentName}\n\n## Props\n\n| Prop Name | Description | Type | Default |\n| :--- | :--- | :--- | :--- |\n${table}\n${usage}`
  }

  dedent(content) {
    const lines = content.replace(/^\r?\n|\r?\n$/g, "").split(/\r?\n/)
    const nonEmpty = lines.filter(line => line.trim())

    if (!nonEmpty.length) return ""

    const indentation = Math.min(...nonEmpty.map(line => line.match(/^[ \t]*/)?.[0].length || 0))

    return lines.map(line => (line.trim() ? line.slice(indentation) : "")).join("\n")
  }

  unwrapCodeBlocks(content) {
    return content.replace(
      /^([ \t]*)```([^\r\n]*)\r?\n([\s\S]*?)^\1```[ \t]*$/gm,
      (match, language, code) =>
        language.trim().toLowerCase() === "vue" ? match : this.dedent(code)
    )
  }
  preserveCodeBlocks(content) {
    return this.dedent(content)
  }
}
