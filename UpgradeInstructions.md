# Upgrade instructions for a Ruby on Rails application that uses Lux

- In package.json file update the lux-styleguidist version with the one that you want from [lux-styleguidist tags](https://github.com/pulibrary/lux-styleguidist/tags)
- Update package.json vue to use vueJS version 3 and not vueJS version 2 example: `"vue": "^3.4.0"`
- In package.json:
   - Add `"postcss-import"` as a dependency and remove `vue-template-compiler`.
   - Add `@vitejs/plugin-vue` as a dev dependency
   - Update `vite`, `sass`, `sass-loader`.
- Search your application for any instances of vue2 or any npm packages that have installed vue2 and remove them or update them accordingly.
   - `npm explain vue@2` will explain why `vue@2` is installed in the node_modules directory and will show dependencies.
- In the app/javascript/entrypoints/application.js file   
    Remove: `import Vue from "vue/dist/vue.esm";`   
            `import system from "lux-design-system";`   
            `import "lux-design-system/dist/system/system.css";`   
            `Vue.use(system);`   
    
    Add: `import {createApp} from "vue";`   
         `import lux from "lux-design-system";`   
         `import "lux-design-system/dist/style.css";`   

    Create: a factory function that will create vue apps:  
          `const app = createApp({});`  
          `const createMyApp = () => createApp(app);`

    Update: the EventListener that listens to class name 'lux', with the new factory function you added.    

          document.addEventListener ('DOMContentLoaded', () => {
                const elements = document.getElementsByClassName('lux')
                for(let i = 0; i < elements.length; i++){
                    createMyApp().use(lux)
                    .mount(elements[i]);
                }
            })
       

- If your application uses yarn, run: 
   - `yarn install`
- If your application uses npm, run:
   - `npm install`
- In `vite.config.ts`:   
    - Replace `import { createVuePlugin } from 'vite-plugin-vue2'` with `import vue from '@vitejs/plugin-vue'`   
    - Replace createVuePlugin() with vue()  
    - Include   

              resolve: {
                  alias: {
                      'vue': 'vue/dist/vue.esm-bundler',
                  },
              }    
              
  
- Run: `bundle exec vite dev` to make sure that vite bundles JS and CSS.
- Run: `bundle install`
- Run: `bundle exec rails server s`
- In `package.json` update Jest and vue/test-utils to vue3:     
    - Update @vue/test-utils and eslint-plugin-jest   
    - Add @vue/vue3-jest as a dev dependency.
    - In the Jest section add as dev dependency:   
      @babel/plugin-proposal-class-properties" and @babel/plugin-proposal-object-rest-spread"
         - and remove `setupFilesAfterEnv`.  
         - In section transform add: 

                "^.+\\.js$": "babel-jest",   
                "^.+\\.vue$": "@vue/vue3-jest"
  - In your Javascript specs:   
    - Replace `import { createLocalVue, mount } from "@vue/test-utils";` with `import { mount } from "@vue/test-utils";`   
  - Update all of your lux components with the prefix 'lux'.    
  - InputAutocomplete changes to LuxAutocompleteInput    

  - Run the Javascript tests: `yarn test`
  - Run the specs: `bundle exec rspec`
         

