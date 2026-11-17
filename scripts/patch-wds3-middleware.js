"use strict"

const fs = require("fs")
const path = require("path")

const serverPath = path.join(
  __dirname,
  "../node_modules/vue-styleguidist/node_modules/webpack-dev-server/lib/Server.js"
)

const original = `  setupDevMiddleware() {
    // middleware for serving webpack bundle
    this.middleware = webpackDevMiddleware(
      this.compiler,
      Object.assign({}, this.options, { logLevel: this.log.options.level })
    );
  }`

const patched = `  setupDevMiddleware() {
    // webpack-dev-middleware 5 rejects webpack-dev-server 3's devServer options.
    const allowed = [
      "mimeTypes",
      "writeToDisk",
      "methods",
      "headers",
      "publicPath",
      "stats",
      "serverSideRender",
      "outputFileSystem",
      "index",
    ]
    const picked = {}
    for (const key of allowed) {
      if (this.options[key] !== undefined) picked[key] = this.options[key]
    }
    this.middleware = webpackDevMiddleware(this.compiler, picked)
    this.middleware.fileSystem = this.compiler.outputFileSystem
  }`

if (!fs.existsSync(serverPath)) {
  process.exit(0)
}

const source = fs.readFileSync(serverPath, "utf8")
if (source.includes("webpack-dev-middleware 5 rejects webpack-dev-server 3")) {
  process.exit(0)
}
if (!source.includes(original)) {
  console.warn("patch-wds3-middleware: setupDevMiddleware did not match; left unchanged")
  process.exit(0)
}

fs.writeFileSync(serverPath, source.replace(original, patched))
