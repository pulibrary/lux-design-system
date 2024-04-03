# lux-styleguidist

## Project setup
```
npm install
```
### Serve the styleguide documentation locally

```
npm run styleguide
```

### Running tests

* Run all tests with `npm run test`
* Run a single test file with `npx jest tests/unit/specs/components/luxGridItem.spec.js`
* Run a single test with the name of the test from the `it()` call: `npx jest -t "should have the appropriate class to define the columns"`

### Release a new version

This requires you to have an account on npm with 2fa enabled.  You will also
need to be part of the PULibrary organization on npm.

```
npm login
npm install --global np@9.2.0 # don't add this as a devDependency, otherwise you won't be able to push to npm
npm run release
```

#### Tips
* If you have a passphrase on your ssh key, run ssh-add ~/.ssh/id_ed25519 (or wherever your key is located).
* If you use a security key, rather than an authenticator app, for two-factor authentication in npmjs.com, make sure that "Require two-factor authentication for write actions" is not checked in your account 2FA settings.
    * Go to:Account -> Manage Two-Factor Authentication -> Uncheck 'Additional Options' -> Update Preferences. If it is checked, np will ask you for an OTP from your phone, and won't allow you to push without it.

### Deploy the styleguide to GitHub Pages
```
npm run deploy
```
This will update the docs at [https://pulibrary.github.io/lux-styleguidist/](https://pulibrary.github.io/lux-styleguidist/).
Please note: For informational purposes only. Don't do this outside of a release!


## Copying Vue 2 components from lux
1. Copy a component from the lux repository into src/components
1. Run `npm run lint --fix` to make sure the component has our formatting rules applied.
1. This repo uses CSS variables, rather than SCSS token variables.  If the component
includes tokens:
    1. Add `@import "../assets/styles/variables.css";` to the `<style>` section.
    1. Replace any token references to use the CSS variable instead.  For example,
      `$font-family-text` can be changed to `var(--font-family-text)`.
1. If the component includes SCSS mixins, add `@import "../assets/styles/mixins.scss";`
to the `<style>` section.  You may also need `../assets/styles/spacing.scss` if the
component uses spacing mixins.  Media queries can't be included in CSS variables, so if you need those, import `../assets/styles/media_queries.scss` and use SCSS variables. There are functions that use SCSS variables and cannot take CSS variables as a parameter; In this case add `@import ../assets/styles/system.scss`.
1. Vue 3 no longer supports functional templates.  If the component includes `<template functional>`,
you will need to refactor it back into a regular template.
1. If the component emits events, [declare the emits in the `emits` option](https://v3-migration.vuejs.org/breaking-changes/emits-option.html).
1. Run `npm run styleguide` and make sure it compiles and looks good.
1. Add the component to src/components/index.js so it is added to the lux Vue plugin and can be used in other projects.
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
            3. Add `await nextTick()` between the `setProps` and the assertion, or simply prepend the setProps command with `await`. (Example: `await wrapper.setProps({ show: true })`)  
        1. Refer to the [vue-test-utils migration guide](https://test-utils.vuejs.org/migration/) for other breaking changes.
    1. Running the tests will produce a snapshot file.  Compare it to the original snapshot file.  If there are no substantial changes, commit it.  If there are substantial changes, make any necessary changes.

### Linting
We are using the eslint_plugin-prettier to lint our files. To adjust the lint format settings, please use the `.prettierrc` file. Code linting rules should be set in `eslintrc.js`.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Using a local copy of lux-styleguidist in your project

1. `yarn global add yalc` (yalc has to be installed globally, it doesn't work as part of the package.json)
2. In lux-styleguidist run: `npm run build && yarn exec yalc publish`   
You should see a note that it's published in store  
3. In the application where lux-styleguidist is installed,    
run: `yarn exec yalc add lux-design-system`
4. Sometimes, your application's vite will have cached the old version.
If you are not seeing your changes, in your application directory run:
`bundle exec vite clobber`.

## Upgrade Instructions

1. [Upgrade from lux 4 to lux 5](UpgradeInstructions.md)
