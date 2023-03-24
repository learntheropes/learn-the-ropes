---
title: Replace Buefy in Nuxtjs 3 with custom scss
description: Replace discontinued nuxt-buefy module in Nuxtjs version 3 and support custom scss with Oruga and Theme Bulma.
tags:
  - webdev
  - nuxtjs
  - nuxtjs-3
  - buefy
  - oruga-ui
---
In Nuxtjs version 2 I was used to the beautiful [nuxt-buefy](https://github.com/buefy/nuxt-buefy) UI module based on [Buefy](https://buefy.org/) an [Bulma](https://bulma.io/). A complete framework for front-end components with a clean syntax.  
Altrought not clearly stated on the repo readme, nuxt-buefy development has been discontinued and the library will not be compatible with Nuxtjs version 3 as [announced](https://github.com/buefy/buefy/issues/2505#issuecomment-997000720) by the project main maintainer [Walter Tommasi](https://github.com/jtommy).   
Walter is now the main contributor of [oruga-ui](https://github.com/oruga-ui), a lightweight library of UI components for Vue.js without CSS framework dependency.  
[Oruga Next](https://www.npmjs.com/package/@oruga-ui/oruga-next) version is for Vue 3.x and therefore supports Nuxtjs version 3.  
Oruga offers a set of components easy to customize and is CSS framewoork agonistic.  
There are different themes to integrate the components with your favorite grid system and CSS utilities, including [theme-bulma](https://github.com/oruga-ui/theme-bulma) for Bulma.  
On the Oruga Github there is a [guide](https://github.com/oruga-ui/oruga#using-oruga-with-nuxt) to integrate with Nuxtjs.  
However the integration is limited, because it doesn't support custom scss/sass styles.  
On the theme-bulma reademe there is a customization [guide](https://github.com/oruga-ui/theme-bulma#customization-sassscss), however this `@import` order seamswrong to me, I lost some time to figure out why by following it, the customizations were not applied in my project.  
After a few hours of searches and tests and even a self-resolved Github [issue](https://github.com/oruga-ui/theme-bulma/issues/81), I was able to make all the parts of the puzzle to work nicely in Nuxtjs version 3, to customize the scss variables and to selectively import only the needed components. Here is my implementation:  
**`package.json`**
```json
{
  "devDependencies": {
    "nuxt": "^3.3.1"
  },
  "dependencies": {
    "@oruga-ui/oruga-next": "^0.5.10",
    "@oruga-ui/theme-bulma": "^0.2.9",
  }
}
```
**`nuxt.config.js`**
```js
// This configuration can be merged in the own file
// Without any change
export default defineNuxtConfig({
  css: [
    'assets/scss/main.scss'
  ]
})
```
**`plugins/oruga.js`**
```js
// This configuration can be merged in the own file
// Without any change
import { defineNuxtPlugin } from '#app'
import Oruga from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Oruga, bulmaConfig)
})
```

**`assets/scss/main.scss`**
```scss
// This configuration can be merged in the own file
// Without any change
@import 'assets/scss/custom';
@import 'bulma/sass/utilities/_all';
@import 'bulma/bulma';
@import '@oruga-ui/theme-bulma/dist/scss/bulma';
```

**`assets/scss/style.scss`**
```scss
// Here is where finally the custom configuations are set
// The file needs to be adapt to the own requiremenets
$custom: hsl(268, 68%, 56%) !default;
$primary: $custom;
```
Optionally, if only a few components are needed, they can be selectively imported, reducing the bundle size.  
For instance, if only the button and the dropdown components are needed, the **`plugins/oruga.js`** function would be:
```js
import { defineNuxtPlugin } from '#app'
// Import each needed component and general Confing object
import { ODropdown, OButton, Config } from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'

export default defineNuxtPlugin((nuxtApp) => {
// Define a nuxtApp.vueApp.component function for each imported component
// Each component can be renamed or kept with default name (reccomanded)
  nuxtApp.vueApp.component('ODropdown', ODropdown)
  nuxtApp.vueApp.component('OButton', OButton)
  nuxtApp.vueApp.use(Config, bulmaConfig)
})
```
