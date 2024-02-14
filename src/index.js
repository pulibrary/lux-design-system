import * as components from "./components"

export default {
  // Vue plugins must expose an install() method, see
  // https://vuejs.org/guide/reusability/plugins.html
  install(app, options) {
    for (const componentKey in components) {
      app.component(components[componentKey].name, components[componentKey])
    }
  },
}
