import fs from "fs"
import path from "path"
import { parse as parseSFC } from "@vue/compiler-sfc"
import { parse as parseJS } from "@babel/parser"

const componentsDir = path.resolve("src/components")
const outputDir = path.resolve("docs/src/components")

function getVueFiles(dir) {
  let results = []

  if (!fs.existsSync(dir)) {
    return results
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      results = results.concat(getVueFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith(".vue")) {
      results.push(fullPath)
    }
  }

  return results
}

// Extract comments
function getCleanComment(node) {
  if (!node.leadingComments) {
    return "No description provided."
  }

  return node.leadingComments
    .map(comment =>
      comment.value
        .replace(/^\s*\*+\s?/gm, "")
        .replace(/\r?\n/g, " ")
        .trim()
    )
    .join(" ")
}

function generateMarkdown(componentName, props, docsContent) {
  let markdown = `# ${componentName}\n\n## Props\n\n`

  markdown += "| Prop Name | Description | Type | Default |\n"
  markdown += "| :--- | :--- | :--- | :--- |\n"

  if (props.length === 0) {
    markdown += "| - | No props documented for this component. | - | - |\n"
    return markdown
  }

  for (const prop of props) {
    markdown += `| \`${prop.name}\` | ${prop.description} | \`${prop.type}\` | \`${prop.default}\` |\n`
  }

  if (docsContent) {
    markdown += `\n## Usage\n\n${docsContent.trim()}\n`
  }

  return markdown
}

function main() {
  const files = getVueFiles(componentsDir)

  if (files.length === 0) {
    console.warn(`No Vue files found in ${componentsDir}`)
    return
  }

  for (const filePath of files) {
    try {
      const source = fs.readFileSync(filePath, "utf8")
      const componentName = path.basename(filePath, ".vue")

      const relativePath = path.relative(componentsDir, filePath)
      const relativeDir = path.dirname(relativePath)

      const targetDir = path.join(outputDir, relativeDir)
      const outputPath = path.join(targetDir, `${componentName}.md`)

      fs.mkdirSync(targetDir, { recursive: true })

      const { descriptor } = parseSFC(source)

      if (!descriptor.scriptSetup) {
        console.warn(`Skipped ${relativePath}: no <script setup> block`)
        continue
      }

      const scriptContent = descriptor.scriptSetup.content

      const ast = parseJS(scriptContent, {
        sourceType: "module",
        plugins: ["jsx"],
        attachComment: true,
      })

      const propsList = []

      for (const node of ast.program.body) {
        let expression = null

        // Supports:
        // const props = defineProps(...)
        if (node.type === "VariableDeclaration") {
          const declaration = node.declarations.find(item => {
            return (
              item.init?.type === "CallExpression" &&
              item.init.callee?.type === "Identifier" &&
              item.init.callee.name === "defineProps"
            )
          })

          expression = declaration?.init
        }

        // Supports:
        // defineProps(...)
        if (node.type === "ExpressionStatement" && node.expression?.type === "CallExpression") {
          expression = node.expression
        }

        if (
          !expression ||
          expression.type !== "CallExpression" ||
          expression.callee?.name !== "defineProps"
        ) {
          continue
        }

        const propsObject = expression.arguments[0]

        if (!propsObject || propsObject.type !== "ObjectExpression") {
          continue
        }

        for (const propNode of propsObject.properties) {
          if (propNode.type !== "ObjectProperty") {
            continue
          }

          const propName = propNode.key.name || propNode.key.value
          const description = getCleanComment(propNode)

          let type = "any"
          let defaultValue = "-"

          if (propNode.value.type === "ObjectExpression") {
            for (const attribute of propNode.value.properties) {
              if (attribute.type !== "ObjectProperty") {
                continue
              }

              const attributeName = attribute.key.name || attribute.key.value

              if (attributeName === "type") {
                type =
                  attribute.value.type === "Identifier"
                    ? attribute.value.name
                    : scriptContent.slice(attribute.value.start, attribute.value.end)
              }

              if (attributeName === "default") {
                defaultValue = scriptContent.slice(attribute.value.start, attribute.value.end)
              }
            }
          } else if (propNode.value.type === "Identifier") {
            type = propNode.value.name
          }

          propsList.push({
            name: propName,
            description,
            type,
            default: defaultValue,
          })
        }
      }

      const docsBlock = descriptor.customBlocks.find(block => block.type === "docs")
      const markdownContent = generateMarkdown(componentName, propsList, docsBlock?.content)

      fs.writeFileSync(outputPath, markdownContent)

      console.log(`Generated docs for ${relativePath}`)
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error)
    }
  }
}

main()
