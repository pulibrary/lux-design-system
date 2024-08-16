# Lux Design System

## [View the Design System](https://pulibrary.github.io/lux-design-system/)

## Adding Lux to an application or website

* [Instructions for adding lux](docs/adding_lux.md)
* If you are looking for examples, take a look at one of the [many PUL applications and sites that use Lux](docs/lux_usage.md).

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
This will update the docs at [https://pulibrary.github.io/lux-design-system/](https://pulibrary.github.io/lux-design-system/).
Please note: For informational purposes only. Don't do this outside of a release!

### Linting
We are using the eslint_plugin-prettier to lint our files. To adjust the lint format settings, please use the `.prettierrc` file. Code linting rules should be set in `eslintrc.js`.

### Style Linting
We are using stylelint and stylelint-config-standard-scss to lint scss files. To disable or customize any rules use the `.stylelintrc.json`. Run `npx stylelint "**/*.scss"` to lint the scss files.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Using a local copy of lux-design-system in your project

1. `yarn global add yalc` (yalc has to be installed globally, it doesn't work as part of the package.json)
2. In lux-design-system run: `npm run build && yarn exec yalc publish`   
You should see a note that it's published in store  
3. In the application where lux-design-system is installed,    
run: `yarn exec yalc add lux-design-system`
4. Sometimes, your application's vite will have cached the old version.
If you are not seeing your changes, in your application directory run:
* `bundle exec vite clobber` for ruby projects
* `yarn dev --force` for Vue projects

## Upgrade Instructions

1. [Upgrade from lux 4 to lux 5](UpgradeInstructions.md)
