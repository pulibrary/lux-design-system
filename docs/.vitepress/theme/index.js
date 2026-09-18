import DefaultTheme from "vitepress/theme"
import "../../../src/assets/styles/style.scss"
import "../../../src/assets/styles/spacing.scss"
import "../../../src/assets/styles/system.scss"
import "../../../src/assets/styles/mixins.scss"
import "../../../src/assets/styles/variables.css"

const components = import.meta.glob("../../../src/components/**/*.vue", { eager: true })

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    for (const path in components) {
      const module = components[path]

      const fileName = path.split("/").pop().replace(".vue", "")
      const componentName = module.default?.name || fileName

      app.component(componentName, module.default)
    }
  },
}
