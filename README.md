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
2. Before we get sass working: comment out the SASS pieces from the component, since we don't have SASS ye
3. Vue 3 no longer supports functional templates.  If the component includes `<template functional>`,
you will need to refactor it back into a regular template.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
