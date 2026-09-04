# Lux Design System

## [View the Design System](https://pulibrary.github.io/lux-design-system/)

## Adding Lux to an application or website

- [Instructions for adding lux](docs/adding_lux.md)
- If you are looking for examples, take a look at one of the [many PUL applications and sites that use Lux](docs/lux_usage.md).

## Project setup

```
npm install
npm run prepare
```

### Serve the styleguide documentation locally

```
npm run styleguide
```

### Running tests

- Run all tests with `npm run test`
- Run a single test file with `npx vitest tests/unit/specs/components/luxGridItem.spec.js`
- Run a single test with the name of the test from the `it()` call: `npx vitest -t "should have the appropriate class to define the columns"`

#### Running playwright

Playwright is an end to end testing harness. It is installed as a packge in the system and is run as part if the CI testing suite.

On first installation you must run `npx playwright install` to get the browsers for playwright.

- to run the tests without a ui and on multiple browsers
  ```
  npx playwright test
  ```
- to run the test with screen shots of each step
  ```
  npx playwright test --ui`
  ```

#### Running examples locally (outside of playwright)
Start a local server on the same port as playwright
```
npx http-server . -p 5002
```
The look at the examples:
  * [Multi Select](http://localhost:5002/examples/multiselect.html)
  * [Static Single Select](http://localhost:5002/examples/singleselect.html)
  * [Dynamic Single Select](http://localhost:5002/examples/singleselectasync.html)

## Release a new version

This requires you to have an account on npm with 2fa enabled. You will also
need to be part of the PULibrary organization on npm.

```
npm login
npm install --global np # don't add this as a devDependency, otherwise you won't be able to push to npm
git switch main
git pull
npm run release
```

**Note** You may get prompted for a One Time Password (OTP) without the opportunity to set up anything to give you the OTP. This will cause the `npm publish` at the end of the `npm run release` to fail.
<img width="1819" height="876" alt="Screenshot 2026-09-01 at 7 22 14 AM" src="https://github.com/user-attachments/assets/af7bb30c-495d-4986-8615-3bb2a3690222" />

After you receive that failure you can run publish separately, which will give you another web login with a check box to allow publish for 5 minutes.  This publish will succeed.
```
npm publish
```
<img width="1194" height="697" alt="Screenshot 2026-09-01 at 7 23 19 AM" src="https://github.com/user-attachments/assets/5d4bfa76-7a8f-47cd-b6ca-ecc766c5aa88" />


### Tips

- If you have a passphrase on your ssh key, run ssh-add ~/.ssh/id_ed25519 (or wherever your key is located).
- If you use a security key, rather than an authenticator app, for two-factor authentication in npmjs.com, make sure that "Require two-factor authentication for write actions" is not checked in your account 2FA settings.
  - Go to:Account -> Manage Two-Factor Authentication -> Uncheck 'Additional Options' -> Update Preferences. If it is checked, np will ask you for an OTP from your phone, and won't allow you to push without it.

## Deploy the styleguide to GitHub Pages

```
npm run deploy
```

This will update the docs at [https://pulibrary.github.io/lux-design-system/](https://pulibrary.github.io/lux-design-system/).
Please note: For informational purposes only. Don't do this outside of a release!

## Linting

We are using the eslint_plugin-prettier to lint our files. To adjust the lint format settings, please use the `.prettierrc` file. Code linting rules should be set in `eslintrc.js`.

### Style Linting

We are using stylelint and stylelint-config-standard-scss to lint scss files. To disable or customize any rules use the `.stylelintrc.json`. Run `npx stylelint "**/*.scss"` to lint the scss files.

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Using a local copy of lux-design-system in your project

1. `yarn global add yalc` (yalc has to be installed globally, it doesn't work as part of the package.json)
2. In lux-design-system run: `npm run build && yarn exec yalc publish`  
   You should see a note that it's published in store
3. In the application where lux-design-system is installed,  
   run: `yarn exec yalc add lux-design-system`
4. Sometimes, your application's vite will have cached the old version.
   If you are not seeing your changes, in your application directory run:

- `bundle exec vite clobber` for ruby projects
- `yarn dev --force` for Vue projects

## Upgrade Instructions

1. [Upgrade from lux 4 to lux 5](UpgradeInstructions.md)
