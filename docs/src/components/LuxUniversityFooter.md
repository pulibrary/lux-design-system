# LuxUniversityFooter

> UniversityFooter includes footer elements required by the University. It may
> be used when the LibraryFooter is too heavy for or not fully relevant to the
> site in question.
> Don't forget to create a fallback for this component by providing the HTML
> rendering in _<noscript></noscript>_ tags.

## Props

| Prop name | Description                                                                                                                                                                                  | Type   | Values | Default                                                                                                                                                                                                                                                                                                                       |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type      | The html element name used for the container                                                                                                                                                 | string | -      | "div"                                                                                                                                                                                                                                                                                                                         |
| maxWidth  | The maximum width of the wrapper. Default is set to 1440.                                                                                                                                    | number | -      | 1440                                                                                                                                                                                                                                                                                                                          |
| theme     | Whether the header is dark, shade, or light. Default is set to dark.                                                                                                                         | string | -      | "dark"                                                                                                                                                                                                                                                                                                                        |
| links     | Links are supplied via an array of objects containting `text` and `href` properties. If no links are supplied then a default list is displayed.<br/>To remove all links pass an empty array. | array  | -      | [<br/> {<br/> text: "Copyright Policy",<br/> href: "https://library.princeton.edu/about/policies/copyright-and-permissions-policies",<br/> },<br/> { text: "Privacy Notice", href: "https://www.princeton.edu/privacy-notice" },<br/> { text: "Accessibility Help", href: "https://accessibility.princeton.edu/help" },<br/>] |

---

```jsx
<div>
  <lux-university-footer theme="dark"></lux-university-footer>
</div>
```
