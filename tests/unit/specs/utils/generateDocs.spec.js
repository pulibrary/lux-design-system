import { describe, expect, it } from "vitest"
import { DocsGenerator } from "@/utils/generateDocs"

describe("DocsGenerator", () => {
  const generator = new DocsGenerator()

  it("dedents documentation content", () => {
    expect(generator.dedent(`<div><lux-alert /></div>`).trim()).toBe(`<div><lux-alert /></div>`)
  })

  it("unwraps jsx code fences", () => {
    const content = `
      \`\`\`jsx
      alert('hello my friend!!!')
      \`\`\`
    `

    expect(generator.unwrapCodeBlocks(content)).not.toContain("```jsx")
    expect(generator.unwrapCodeBlocks(content)).toContain("alert('hello my friend!!!')")
  })

  it("preserves Vue code fences", () => {
    const content = `
      \`\`\`vue
      <template>
        <lux-dialog />
      </template>
      \`\`\`
    `

    expect(generator.unwrapCodeBlocks(content)).toContain("```vue")
  })

  it("generates a props table", () => {
    const markdown = generator.generateMarkdown("LuxAlert", [
      {
        name: "status",
        description: "Alert severity",
        type: "String",
        default: '"info"',
      },
    ])

    expect(markdown).toContain('| `status` | Alert severity | `String` | `"info"` |')
  })

  it("extracts defineProps metadata", () => {
    const props = generator.extractProps(`
      const props = defineProps({
        /**
         * Alert severity
         */
        status: {
          type: String,
          default: "info",
        },
      })
    `)

    expect(props).toEqual([
      {
        name: "status",
        description: "Alert severity",
        type: "String",
        default: '"info"',
      },
    ])
  })
})
