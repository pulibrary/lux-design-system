// This file is only used when running the
// styleguide, not when bundling the
// components for use in other applications.
//
// If a vue plugin needs to be installed both
// for the styleguide and for use in other applications,
// also add it to src/index.js

import VCalendar from "v-calendar"
import "v-calendar/style.css"

export default function (vueApp) {
  vueApp.use(VCalendar, {})
}
