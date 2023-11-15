# lux-styleguidist

## Project setup
```
npm install
```
### Serve the styleguide documentation locally

```
npm run styleguide
```

## Copying Vue 2 components from lux
1. Copy a component from the lux repository into src/components
1. This repo uses CSS variables, rather than SCSS token variables.  If the component
includes tokens:
  1. Add `@import "../assets/styles/variables.css";` to the `<style>` section.
  1. Replace any token references to use the CSS variable instead.  For example, 
    `$font-family-text` can be changed to `var(--font-family-text)`.
1. If the component includes SCSS mixins, add `@import "../assets/styles/mixins.scss";`
to the `<style>` section.  You may also need `../assets/styles/spacing.scss` if the
component uses spacing mixins.
1. Vue 3 no longer supports functional templates.  If the component includes `<template functional>`,
you will need to refactor it back into a regular template.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
