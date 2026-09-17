# LuxLibraryHeader

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `type` | The html element name used for the container | `String` | `"div"` |
| `appName` | The name of the application or site | `String` | `""` |
| `abbrName` | The abbreviation of the application or site's name | `String` | `""` |
| `appUrl` | The URL of landing page for the application or site | `String` | `""` |
| `maxWidth` | The maximum width of the wrapper. Default is set to 1440. | `Number` | `1440` |
| `theme` | Whether the header is dark, shade, or light. Default is set to dark. | `String` | `"dark"` |

## Usage

<div>
  <lux-library-header app-name="Leave and Travel Requests" abbr-name="LTR" app-url="https://catalog.princeton.edu" theme="dark">
    <lux-menu-bar type="main-menu" :menu-items="[
        {name: 'Help', component: 'Help', href: '/help/'},
        {name: 'Feedback', component: 'Feedback', href: '/feedback/'},
        {name: 'Your Account', component: 'Account', href: '/account/', children: [
          {name: 'Logout', component: 'Logout', href: '/account/'}
        ]}
      ]"
    ></lux-menu-bar>
  </lux-library-header>
</div>

<div class="dos-n-donts">
  <div class="do">
    <div class="do-dont-example">
      <lux-library-header></lux-library-header>
      <noscript>Place fallback header here.</noscript>
    </div>
    <p>Make sure users with JavaScript disabled can see important parts of the page by using &lt;noscript&gt; tags.</p>
  </div>

  <div class="dont">
    <div class="do-dont-example">
      <lux-spacer></lux-spacer>
      <p>? ? ? </p>
      <lux-spacer></lux-spacer>
    </div>
    <p>JavaScript-disabled browsers won't see any branding and may be missing important functionality.</p>
  </div>
</div>

  You can pass in a custom logo via the logo slot. Wrap it in your home page
  link if desired, and make sure to include an `alt` property on the `img` tag:

<div>
  <lux-library-header app-url="https://catalog.princeton.edu" theme="dark">
    <template v-slot:logo>
      <a href="https://github.com/pulibrary/tigerdata-app">
        <img src="https://raw.githubusercontent.com/pulibrary/tigerdata-app/refs/heads/main/app/assets/images/TigerData-LOGO-KO_wide2.svg" alt="TigerData" height="100">
      </a>
    </template>
    <lux-menu-bar type="main-menu" :menu-items="[
        {name: 'Help', component: 'Help', href: '/help/'},
        {name: 'Feedback', component: 'Feedback', href: '/feedback/'},
        {name: 'Your Account', component: 'Account', href: '/account/', children: [
          {name: 'Logout', component: 'Logout', href: '/account/'}
        ]}
      ]"
    ></lux-menu-bar>
  </lux-library-header>
</div>
