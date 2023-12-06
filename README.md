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
1. Copy the test for the component from the lux test/unit/specs/components directory.
    1. Revert any changes to the test that were needed for functional templates.
    1. Modify the import for the test to point to the component's new path.
    1. Remove any references to `localVue`, the new versions of vue-test-utils don't
    support it or need it.
    1. Change mount params in this format:

        ```
        {context: { props: { my_data: "data" }}}
        ```

        to this format:

        ```
        {props: { my_data: "data" }}
        ```
    1. Run the tests with `npm run test`.  Make any necessary changes to get the tests to pass.
        1. If a value is not updating correctly after a `wrapper.setProps` call, follow these steps to add a `nextTick()`, which will cause Vue to update the value:
            1. If it's not already imported, add `import { nextTick } from "vue"`
            2. Add `async` to the test arrow function.
            3. Add `await nextTick()` between the `setProps` and the assertion.  
        1. Refer to the [vue-test-utils migration guide](https://test-utils.vuejs.org/migration/) for other breaking changes.
    1. Running the tests will produce a snapshot file.  Compare it to the original snapshot file.  If there are no substantial changes, commit it.  If there are substantial changes, make any necessary changes.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
