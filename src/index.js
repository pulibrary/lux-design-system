import * as components from "./components"

const Lux = {
  install(app) {
    for (const componentKey in components) {
      app.use(components[componentKey])
    }
  },
}

export default Lux
