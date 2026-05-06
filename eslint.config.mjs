import { defineConfig, globalIgnores } from "eslint/config"
import pluginVue from "eslint-plugin-vue"
import pluginPrettier from "eslint-plugin-prettier/recommended"
import vueParser from "vue-eslint-parser"

export default defineConfig([
  globalIgnores([
    "node_modules/**/*",
    "dist/**/*",
    ".git/**/*",
    "playwright-report/**/*",
    "styleguide/**/*",
    "test-results/**/*",
  ]),
  pluginVue.configs["flat/essential"],
  pluginPrettier,
  {
    languageOptions: {
      parser: vueParser,
    },

    plugins: {
      vue: pluginVue,
    },

    extends: ["vue/flat/essential"],

    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "vue/no-unused-vars": process.env.NODE_ENV === "production" ? "warn" : 1,
      "vue/no-deprecated-v-on-native-modifier": process.env.NODE_ENV === "production" ? "warn" : 1,
    },
    files: ["**/*.vue"],
    ignores: ["dist/*"],
  },
  {
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "vue/no-unused-vars": process.env.NODE_ENV === "production" ? "warn" : 1,
      "vue/no-deprecated-v-on-native-modifier": process.env.NODE_ENV === "production" ? "warn" : 1,
    },
    files: ["**/*.(m)js?(x)"],
    ignores: ["dist/*"],
  },
])
