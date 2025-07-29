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
    await this.#writeBorderRadius()

    await this.#cleanup();
  }

  // This method is responsible for parsing the CSS file
  // into arrays of color tokens, font size tokens, and
  // spacing tokens.
  async #extractDesignTokens() {
    this.borderRadius = []
    this.colors = []
    this.fontSizes = []
    this.spacings = []

    for await (const line of this.cssVarsFileHandle.readLines()) {
      const data = line.split(":").map(tokenData => tokenData.trim())
      switch(this.#tokenType(line)) {
        case 'border-radius':
          this.borderRadius.push(data)
          break
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
    if (cssLine.includes("--border-radius")) {
      return 'border-radius'
    } else if (cssLine.includes("--color")) {
      return 'color'
    } else if (cssLine.includes("--font-size")) {
      return 'font-size'
    } else if (cssLine.includes("--space")) {
      return 'spacing'
    }
    return 'other'
  }

  async #writeStyles() {
    await this.#append(`
<!-- this documentation is automatically generated, please edit variables.css or generateDesignTokenDocs.mjs to make changes -->
<style>
  .swatch {
    height: 100px;
    width: 100px;
    border: 1px solid black;
    border-radius: var(--border-radius-default);
  }
  .spacing {
    background: var(--color-grayscale-lighter);
    width: 100%;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
    margin-bottom: 8px;
    border-radius: var(--border-radius-default);
  }
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .border-radius {
    border: var(--color-princeton-orange-on-white) 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    margin: 8px;
  }
</style>\n`);
  }

  async #writeColorTable() {
    await this.#append( `
## Colors

|Color|Variable|Value|
|---|---|---|
`);
    for (const colorData of this.colors) {
      await this.#append(
        `|<div class="swatch" style="background-color: ${colorData[1]}"></div>|<pre>${colorData[0]}</pre>|${colorData[1]}|\n`
      )
    }
  }

  async #writeFontSizes() {
    await this.#append( `
## Font sizes

|Variable|Value|
|---|---|
    `);
    for (const fontSizeData of this.fontSizes) {
      await this.#append(
        `|<span style="font-size: ${fontSizeData[1]}">${fontSizeData[0]}</span>|${fontSizeData[1]}|\n`
      )
    }
  }

  async #writeSpacing() {
    await this.#append( "\n## Spacing\n\n");
    for (const spacingData of this.spacings) {
      await this.#append(
        `<div class="spacing" style="height: ${spacingData[1]};line-height: ${spacingData[1]}">${spacingData[0]} (${spacingData[1]})</div>\n`
      )
    }
  }

  async #writeBorderRadius() {
    await this.#append( "\n## Border Radius\n\n<div class=\"row\">");
    for (const borderRadiusData of this.borderRadius) {
      await this.#append(
        `<div class="border-radius" style="border-radius: ${borderRadiusData[1]}">${borderRadiusData[0]} (${borderRadiusData[1]})</div>\n`
      )
    }
    await this.#append("</div>")
  }

  async #append(text) {
    await appendFile(this.designTokenDocsFileHandle, text)
  }

  async #cleanup() {
    return await Promise.allSettled([
      this.cssVarsFileHandle.close(),
      this.designTokenDocsFileHandle.close()
    ]);
  }

}

new DesignTokenDocs().generate().then(_ => console.log('Re-generated design token documentation'))
