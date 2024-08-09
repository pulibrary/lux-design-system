### Adding Lux to your project

#### Adding Lux to a vue+vite application

[An example Vue+Vite application](https://github.com/pulibrary/vue-app-with-lux)
that demonstrates [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking).

1. Add lux-design-system to your dependencies in package.json
1. In your main.js, import the LUX css:
    ```
    import 'lux-design-system/dist/style.css'
    ```
1. You can now import individual lux components into
your application's components.

The nice thing about this approach is that Vite will
tree-shake lux.  This way, your application bundle
will only include the lux components that you 
actually use, which means faster download times for the user.

#### Adding Lux to a vite+rails project

Some examples of this approach include [approvals](https://github.com/pulibrary/approvals) and
[DSS](https://github.com/pulibrary/DSS).

1. In your entrypoints/application.js file, add the import statements for lux and vue:
   ```
   import { createApp } from "vue";
   import "lux-design-system/dist/style.css";

   // Option 1: import the default export from
   // lux to import all of lux into your project
   import lux from "lux-design-system";

   // Option 2: import only the components you
   // need from lux, to enable tree-shaking and
   // a smaller bundle size
   import { LuxLibraryFooter, LuxLibraryHeader, LuxMenuBar, LuxLogoUniversity, LuxLogoLibraryIcon, LuxLibraryLogo, LuxLogoLibrary, LuxWrapper, LuxSpacer } from "lux-design-system";
   ```
1. In your entrypoints/application.js, create a factory function
for creating vue apps:
    ```
    const app = createApp({});
    const createMyApp = () => createApp(app);
    ```
1. In your entrypoints/application.js, use the lux plugin (if you chose option 1 above) or add the specific components your
Rails app uses (if you chose option 2 above).  Then mount the
Vue app to the appropriate element(s) in the DOM.
    ```
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.getElementsByClassName('lux')
        for (let i = 0; i < elements.length; i++) {
            // Option 1: use all of lux
            createMyApp()
                .use(lux)
                .mount(elements[i]);

            // OR option 2: use specific lux components
            createMyApp()
                .component("lux-library-footer", LuxLibraryFooter)
                .component("lux-library-header", LuxLibraryHeader)
                .component("lux-menu-bar", LuxMenuBar)
                .component("lux-logo-university", LuxLogoUniversity)
                .component("lux-logo-library-icon", LuxLogoLibraryIcon)
                .component("lux-library-logo", LuxLibraryLogo)
                .component("lux-logo-library", LuxLogoLibrary)
                .component("lux-wrapper", LuxWrapper)
                .component("lux-spacer", LuxSpacer)
                .mount(elements[i]);
        }
    })
    ```
1. Add lux components as needed in your views or ViewComponents.
1. Add classes or CSS variables from lux to your styling.


#### Adding Lux to a static HTML page

Importmaps are a nice way to add vue and
lux to a static site.  An example of this
approach is the [Pulibrary github blog](https://github.com/pulibrary/pulibrary.github.io).

This approach is simple, but there is a drawback.
The user has to download all of lux, rather than
just the components you need (i.e. there is no
tree shaking).

1. In your HTML, import Vue and lux from a
CDN, like so:
    ```
    <script type="importmap">
      {
        "imports": {
          "vue": "https://unpkg.com/vue@3.2.47/dist/vue.esm-browser.prod.js",
          "lux-design-system": "https://unpkg.com/lux-design-system@5.0.2/dist/lux-styleguidist.mjs"
        }
      }
    </script>
    ```
1. Add some javascript that creates and mounts a
Vue application and installs lux as a vue plugin.
    ```
    import { createApp } from 'vue';
    import lux from 'lux-design-system';

    const app = createApp({});
    app.use(lux)
    .mount('#app');
    ```
    If you are only using lux for a header and footer:
    ```
    import { createApp } from 'vue';
    import lux from 'lux-design-system';

    const headerApp = createApp({});
    headerApp.use(lux)
    .mount('#lux-header-container')

    const footerApp = createApp({});
    footerApp.use(lux)
    .mount('#lux-footer-container');
    ```

1. Import the CSS as from a CDN.
    ```
    <link rel="stylesheet" href="https://unpkg.com/lux-design-system@5.0.2/dist/style.css">
    ```
1. Add lux components as needed in your HTML.  If you are just adding a
   header and footer:
   ```
   <div id="lux-header-container">
    <lux-library-header app-name="Research Guides" abbr-name="Guides" app-url="https://libguides.princeton.edu/" theme="dark">
      <lux-menu-bar type="main-menu" :menu-items="[
          {name: 'Help', component: 'Help', href: 'https://library.princeton.edu/ask-us'},
          {name: 'Your Accounts', component: 'Account', href: 'https://library.princeton.edu/accounts'}
        ]"
      ></lux-menu-bar>
    </lux-library-header>

    <!-- the rest of your page -->

    <div id="lux-footer-container">
      <lux-library-footer></lux-library-footer>
    </div>
   ```
1. Add classes or CSS variables from lux to your styling.

##### Adding Lux to a static HTML page using an IIFE file
If you can't use an import map and have to use `<script src>` then from cdn use the IIFE file - `https://unpkg.com/lux-design-system@<versionNumber>/dist/lux-styleguidist.iife.js`.

Add the following `<script>` tags after the `<head>` tag:
```
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/lux-design-system@5.5.0/dist/lux-styleguidist.iife.js"></script>
```
After `<body>` tag add the following `<script>` tag:
```
<script>
    const { createApp } = Vue
    createApp().use(Lux.default).mount('#app')
</script>
```

#### Adding only the Lux CSS

You can just bring in the lux CSS (including all the CSS variables) from a CDN.
An example of this approach is the [DACS handbook](https://github.com/pulibrary/dacs_handbook).

To do this, add the CSS from a CDN to your HTML:

```
    <link rel="stylesheet" href="https://unpkg.com/lux-design-system@5.1.1/dist/style.css">
```
