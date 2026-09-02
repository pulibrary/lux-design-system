import DefaultTheme from "vitepress/theme"
import "../../../src/assets/styles/style.scss"
// import LuxAlert from "../../../src/components/LuxAlert.vue"
import LuxBadge from "../../../src/components/LuxBadge.vue"
import LuxDialog from "../../../src/components/LuxDialog.vue"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // app.component("LuxAlert", LuxAlert)
    app.component("LuxBadge", LuxBadge)
    app.component("LuxDialog", LuxDialog)
  },
}
