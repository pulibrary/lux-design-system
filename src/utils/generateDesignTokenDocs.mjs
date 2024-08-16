import { open, appendFile } from "node:fs/promises"

// This class is responsible for reading CSS variables from
// a CSS file, and generating a Markdown file for developers
// that describes those variables.
export class DesignTokenDocs {
  async generate(
    cssFilePath="src/assets/styles/variables.css",
    designTokenDocsPath = "docs/design_tokens.md"
  ) {
    this.cssVarsFileHandle = await open(cssFilePath)
    this.designTokenDocsFileHandle = await open(designTokenDocsPath, 'w')

    await this.#extractDesignTokens()

    await this.#writeStyles()
    await this.#writeColorTable()
    await this.#writeFontSizes()
    await this.#writeSpacing()

    await this.#cleanup();
  }

  // This method is responsible for parsing the CSS file
  // into arrays of color tokens, font size tokens, and
  // spacing tokens.
  async #extractDesignTokens() {
    this.colors = []
    this.fontSizes = []
    this.spacings = []

    for await (const line of this.cssVarsFileHandle.readLines()) {
      const data = line.split(":").map(tokenData => tokenData.trim())
      switch(this.#tokenType(line)) {
        case 'color':
          this.colors.push(data)
          break
        case 'font-size':
          this.fontSizes.push(data)
          break
        case 'spacing':
          this.spacings.push(data)
          break
      }
    }
  }

  #tokenType(cssLine) {
    if (cssLine.includes("--color")) {
      return 'color'
    } else if (cssLine.includes("--font-size")) {
      return 'font-size'
    } else if (cssLine.includes("--space")) {
      return 'spacing'
    }
    return 'other'
  }

  async #writeStyles() {
    await appendFile(
      this.designTokenDocsFileHandle, `
<!-- this documentation is automatically generated, please edit variables.css or generateDesignTokenDocs.mjs to make changes -->
<style>
  .swatch {
    height: 100px;
    width: 100px;
    border: 1px solid black;
  }
  .spacing {
    background: var(--color-grayscale-lighter);
    width: 100%;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
    margin-bottom: 8px;
  }
</style>\n`);
  }

  async #writeColorTable() {
    await appendFile(this.designTokenDocsFileHandle, `
## Colors

|Color|Variable|Value|
|---|---|---|
`);
    for (const colorData of this.colors) {
      await appendFile(
        this.designTokenDocsFileHandle,
        `|<div class="swatch" style="background-color: ${colorData[1]}"></div>|<pre>${colorData[0]}</pre>|${colorData[1]}|\n`
      )
    }
  }

  async #writeFontSizes() {
    await appendFile(this.designTokenDocsFileHandle, `
## Font sizes

|Variable|Value|
|---|---|
    `);
    for (const fontSizeData of this.fontSizes) {
      await appendFile(
        this.designTokenDocsFileHandle,
        `|<span style="font-size: ${fontSizeData[1]}">${fontSizeData[0]}</span>|${fontSizeData[1]}|\n`
      )
    }
  }

  async #writeSpacing() {
    await appendFile(this.designTokenDocsFileHandle, "\n## Spacing\n\n");
    for (const spacingData of this.spacings) {
      await appendFile(
        this.designTokenDocsFileHandle,
        `<div class="spacing" style="height: ${spacingData[1]};line-height: ${spacingData[1]}">${spacingData[0]} (${spacingData[1]})</div>\n`
      )
    }
  }

  async #cleanup() {
    return await Promise.allSettled([
      this.cssVarsFileHandle.close(),
      this.designTokenDocsFileHandle.close()
    ]);
  }

}

new DesignTokenDocs().generate().then(_ => console.log('Re-generated design token documentation'))
