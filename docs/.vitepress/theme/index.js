import DefaultTheme from "vitepress/theme"
import "../../../src/assets/styles/style.scss"
import "../../../src/assets/styles/spacing.scss"
import "../../../src/assets/styles/system.scss"
import "../../../src/assets/styles/mixins.scss"
import "../../../src/assets/styles/variables.css"
import VCalendar from "v-calendar"
import "v-calendar/style.css"

import * as components from "../../../src/components/index.js"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VCalendar, {})
    Object.keys(components).forEach(componentName => {
      app.component(componentName, components[componentName])
    })
  },
}
