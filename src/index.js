// This file is only used when bundling
// the components for use in other applications,
// it is not used when running the styleguide.
//
// If a vue plugin needs to be installed both
// for the styleguide and for use in other applications,
// also add it to styleguide_vue_app.js

import * as components from "./components"
import VCalendar from "v-calendar"
import "v-calendar/style.css"

export default {
  // Vue plugins must expose an install() method, see
  // https://vuejs.org/guide/reusability/plugins.html
  install(app, options) {
    installThirdPartyPlugins(app)
    installLuxComponents(app)
  },
}

function installThirdPartyPlugins(app) {
  app.use(VCalendar, {})
}

function installLuxComponents(app) {
  for (const componentKey in components) {
    app.component(components[componentKey].name, components[componentKey])
  }
}
