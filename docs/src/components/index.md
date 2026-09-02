---
sidebarDepth: 2
---

# index

## LuxInputButton

> Buttons are used to toggle something in the interface or trigger new
> content in the same context.

### Props

| Prop name        | Description                                                                                                                                                                                                     | Type    | Values | Default  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| variation        | The button's variations `solid, outline, text, dropdown, icon`                                                                                                                                                  | string  | -      | "solid"  |
| type             | The button's type attribute `button, submit`                                                                                                                                                                    | string  | -      | "button" |
| size             | Sets the size of the button `small, medium, large`                                                                                                                                                              | string  | -      | "medium" |
| block            | Whether the button extends the full available width or not                                                                                                                                                      | boolean | -      | false    |
| disabled         | Whether the button is disabled or not<br/>`true, false`                                                                                                                                                         | boolean | -      | false    |
| focused          | Whether the button is focused or not<br/>`true, false`                                                                                                                                                          | boolean | -      | false    |
| customAlertEvent | Clicking this button can emit a custom event that should trigger an alert.<br/>You must supply an alertStatus and alertMessage, like so:<br/>{ 'alertStatus': 'success', 'alertMessage': 'This is my message.'} | object  | -      | null     |
| hideLabel        | Visually hides the button text.                                                                                                                                                                                 | boolean | -      | false    |
| icon             | Indicates what icon to use. Values should be hyphenated and do not use the "lux-icon-" prefix.<br/>For example, instead of `lux-icon-search`, simply use `search`.                                              | string  | -      | ""       |

### Events

| Event name     | Properties | Description |
| -------------- | ---------- | ----------- |
| button-clicked |            |
| system-alert   |            |

### Slots

| Name    | Description              | Bindings |
| ------- | ------------------------ | -------- |
| default | The text of your button. |          |

---

```jsx
    <div>
      <!-- use :focused sparingly and only when necessary to set the focus; uncomment below to test in preview above -->
      <!-- <lux-input-button type="button" focused variation="icon" size="small" icon="search" hideLabel></lux-input-button> -->
      <lux-input-button type="button" variation="icon-prepend" size="small" icon="search" hideLabel>Search</lux-input-button>

      <lux-input-button variation="solid" size="small">Apply Changes</lux-input-button>
      <lux-input-button type="button" variation="solid">Apply Changes</lux-input-button>
      <lux-input-button type="button" variation="solid" size="large" disabled>Apply Changes</lux-input-button>

      <lux-input-button type="submit" variation="solid" block>Submit</lux-input-button>

      <lux-input-button type="button" variation="outline">Manage Files</lux-input-button>

      <lux-input-button type="button" variation="text">Manage Files</lux-input-button>
    </div>
```

## LuxInputCheckbox

> Form Inputs are used to allow users to provide text input when the expected
> input is short. Form Input has a range of options and supports several text
> formats including numbers. For longer input, use the `FormTextarea` element.

### Props

| Prop name    | Description                                                                                     | Type    | Values | Default |
| ------------ | ----------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| vertical     | If true, the checkboxes will be stacked vertically. Otherwise they will be horizontal (inline). | boolean | -      | false   |
| options      | The available options to check. Option properties are: id, value, disabled, required, checked   | array   | -      |         |
| label        | The label of the form input field.                                                              | string  | -      | ""      |
| errormessage | The validation message a user should get.                                                       | string  | -      | ""      |
| groupLabel   | The html element name used for the wrapper.<br/>`div, section`                                  | string  | -      | ""      |
| disabled     | Whether the form input field is disabled or not.<br/>`true, false`                              | boolean | -      | false   |
| required     | Whether the form input field is required or not.<br/>`true, false`                              | boolean | -      | false   |
| hover        | Manually trigger input field’s hover state.<br/>`true, false`                                   | boolean | -      | false   |
| focus        | Manually trigger input field’s focus state.<br/>`true, false`                                   | boolean | -      | false   |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| change     |            |
| inputblur  |            |

---

```jsx
  <div>
    <lux-input-checkbox groupLabel="Where is my mind?" :options="[{name: 'opt 1', value: 'In the clouds', id: 'checkbox-opt1', required: true}, {name: 'opt 2', value: 'I don\'t know', id: 'checkbox-opt2', disabled: true}]"></lux-input-checkbox>
  </div>
```

## LuxInputMultiselect

### Props

| Prop name              | Description                                                                                                               | Type    | Values | Default         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | --------------- |
| items                  | An array of items. Each item should be an object with (at minimum) an id and label property.                              | array   | -      | []              |
| asyncLoadItemsFunction | A function to load items asynchronously on user input. It should return an item list in the format [{id: "", label: ""}]. | func    | -      | null            |
| placeholder            | Placeholder text to display                                                                                               | string  | -      |                 |
| label                  | The label of the form input field.                                                                                        | string  | -      |                 |
| hideLabel              | Visually hides the label of the form input field.                                                                         | boolean | -      | false           |
| noneSelectedLabel      | Text to display if the user hasn't selected anything yet                                                                  | string  | -      | "None selected" |
| selectedItemsLabel     | Label for the summary of items that the user has selected so far                                                          | string  | -      |                 |
| debounceTimeout        | The milliseconds to wait for more user input before sending the query                                                     | number  | -      | 500             |
| defaultValues          | The default selected items. It should be an array in the format [{id: "", label: ""}]                                     | array   | -      | []              |
| searchOnEmptyQuery     | Should we run a search when a user clicks into the component                                                              | boolean | -      | false           |

### Slots

| Name         | Description                                                                                                                | Bindings                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| item         | item -- used to adjust the style and format of the items you have selected                                                 | **itemProps** `object` - an individual item that you would like to style           |
| hidden-input | hidden-input -- You can use this to pass all of the user's selected values back to the backend (e.g. Rails) on form submit | **selectedItems** `array` - an array of items (objects) that the user has selected |

---

```jsx
    <div>
    <lux-input-multiselect :items="[
          { id: 1, label: 'Apple' },
          { id: 2, label: 'Banana' },
          { id: 3, label: 'Banana split' },
          { id: 4, label: 'Mango' },
        ]"
        placeholder="Please choose a fruit"
        label="Your first fruit"
        selected-items-label="Selected fruits"
        none-selected-label="No fruits selected" />

    <p style="margin-top: var(--space-large);">If you have asynchronous data you can return it via a function:</p>
    <lux-input-multiselect
        placeholder="Please choose your query"
        label="Your query"
        selected-items-label="Selected Queries"
        :asyncLoadItemsFunction="query => {if (query === '') return []; else return [{id: 'abc', label: query}]}"
        none-selected-label="No query selected" />

    <p style="margin-top: var(--space-large);">If you have a specific way you'd like to display the items, you can pass it as a template into the item slot:</p>
    <lux-input-multiselect :items="[
          { id: 1, label: 'Apple' },
          { id: 2, label: 'Banana' },
          { id: 3, label: 'Banana split' },
          { id: 4, label: 'Mango' },
        ]"
        label="Your second fruit"
        :hide-label="true">
      <template #item="{itemProps}">
        <lux-text-style style="display: flex">
          <lux-badge>{{itemProps.id}}</lux-badge>
          <span style="background-color:red;color:white;" v-if="itemProps.id === 1">Apples are delicious!  Good choice!</span>
          <span v-else>{{itemProps.label}}</span>
        </lux-text-style>
      </template>
    </lux-input-multiselect>
    </div>
```

## LuxInputRadio

> Radio buttons should only be used when a user can select one option.
> For multiple selections, use checkboxes.

### Props

| Prop name    | Description                                                                                        | Type    | Values | Default |
| ------------ | -------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| vertical     | If true, the radio buttons will be stacked vertically. Otherwise they will be horizontal (inline). | boolean | -      | false   |
| options      | The available options to check. Option properties are: id, value, disabled, required, checked      | array   | -      |         |
| groupLabel   | The label of the form input field.                                                                 | string  | -      | ""      |
| errormessage | The validation message a user should get.                                                          | string  | -      | ""      |
| id           | Unique identifier of the form input field.                                                         | string  | -      | ""      |
| disabled     | Whether the form input field is disabled or not.<br/>`true, false`                                 | boolean | -      | false   |
| required     | Whether the form input field is required or not.<br/>`true, false`                                 | boolean | -      | false   |
| hover        | Manually trigger input field’s hover state.<br/>`true, false`                                      | boolean | -      | false   |
| focus        | Manually trigger input field’s focus state.<br/>`true, false`                                      | boolean | -      | false   |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| change     |            |
| inputblur  |            |

---

```jsx
  <div>
    <lux-input-radio
      id="foo"
      vertical groupLabel="Where is my mind?"
      :options="[
        {name: 'radio-group-name', value: 'In the clouds', id: 'radio-opt1', required: true},
        {name: 'radio-group-name', value: 'I don\'t know', id: 'radio-opt2', disabled: true}
      ]">
    </lux-input-radio>
  </div>
```

## LuxInputSelect

> Input Selects are used to allow users to choose among a number of options.

### Props

| Prop name    | Description                                                        | Type    | Values | Default  |
| ------------ | ------------------------------------------------------------------ | ------- | ------ | -------- |
| value        | Sets the value of the selected option.                             | string  | -      |          |
| multiple     | Determines whether the user can select multiple options.           | boolean | -      | false    |
| options      | The available options to check.                                    | array   | -      |          |
| label        | The label of the input select field.                               | string  | -      | ""       |
| hideLabel    | Visually hides the label of the form input field.                  | boolean | -      | false    |
| errormessage | The validation message a user should get.                          | string  | -      | ""       |
| wrapper      | The html element name used for the wrapper.<br/>`div, section`     | string  | -      | "div"    |
| id           | Unique identifier of the input select field.                       | string  | -      | ""       |
| name         | The name attribute for the form input field.                       | string  | -      | ""       |
| width        | The width of the input select field.<br/>`auto, expand`            | string  | -      | "auto"   |
| size         | Sets the size of the input area `small, medium, large`             | string  | -      | "medium" |
| disabled     | Whether the form input field is disabled or not.<br/>`true, false` | boolean | -      | false    |
| required     | Whether the form input field is required or not.<br/>`true, false` | boolean | -      | false    |
| hover        | Manually trigger input field’s hover state.<br/>`true, false`      | boolean | -      | false    |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| change     |            |
| inputblur  |            |

### Expose

#### focusSelect

>

---

```jsx
    <div>
      <lux-input-select label="Select..." id="myChoice" name="myChoice" value="bar" :options="[{label: 'opt 1', value: 'foo'}, {label: 'opt 2', value: 'bar'}]"></lux-input-select>
    </div>
```

## LuxInputAsyncSelect

> This component can be utilized to provide asynchronous data to a LuxAutocompleteInput.

    This component only allows the user to choose one option from the list.
    When the user types into the search box asyncLoadItemsFunction is triggered to get the options shown to the user.

    - Utilize LuxInputSelect if you have a small number of static options for the user to scroll through.
      LuxInputSelect allows for a static list of options.
    - Utilize LuxAutocompleteInput if you want to allow the user to search a static list of options, not just scroll them.
      LuxAutocompleteInput allows for a static list of options.
    - Utilize LuxInputMultiselect if you want to allow the user to select multiple options.
      LuxInputMultiselect allows for both a static list or an asynchronous list of options.

### Props

| Prop name              | Description                                                                                                               | Type    | Values | Default |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| asyncLoadItemsFunction | A function to load items asynchronously on user input. It should return an item list in the format [{id: "", label: ""}]. | func    | -      |         |
| placeholder            | Placeholder text to display                                                                                               | string  | -      |         |
| label                  | The label of the form input field.                                                                                        | string  | -      |         |
| hideLabel              | Visually hides the label of the form input field.                                                                         | boolean | -      | false   |
| debounceTimeout        | The milliseconds to wait for more user input before sending the query                                                     | number  | -      | 500     |
| defaultValue           | The default value for the form input field.                                                                               | object  | -      |         |
| searchOnEmptyQuery     | Should we run a search when a user clicks into the component                                                              | boolean | -      | false   |

### Slots

| Name         | Description                                                                                                        | Bindings                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| hidden-input | hidden-input -- You can use this to pass the user's selected value back to the backend (e.g. Rails) on form submit | **selectedItem** `string` - an array of items (objects) that the user has selected |

---

```jsx
    <div>
      <lux-input-async-select
          placeholder="Please choose your query"
          label="Your query"
          :asyncLoadItemsFunction="query => [{id: 'abc', label: query}]"
          none-selected-label="No query selected" />
    </div>
```

## LuxInputText

> Form Inputs are used to allow users to provide text input when the expected
> input is short. Form Input has a range of options and supports several text
> formats including numbers. For longer input, use the `FormTextarea` element.

### Props

| Prop name    | Description                                                              | Type           | Values | Default  |
| ------------ | ------------------------------------------------------------------------ | -------------- | ------ | -------- |
| type         | The type of the form input field.<br/>`text, number, email`              | string         | -      | "text"   |
| value        | Text value of the form input field.                                      | string\|number | -      | ""       |
| placeholder  | The placeholder value for the form input field.                          | string         | -      | null     |
| label        | The label of the form input field.                                       | string         | -      | ""       |
| hideLabel    | Visually hides the label of the form input field.                        | boolean        | -      | false    |
| errormessage | The validation message a user should get.                                | string         | -      | ""       |
| helper       | The helper text a user should get.                                       | string         | -      | ""       |
| wrapper      | The html element name used for the wrapper.<br/>`div, section`           | string         | -      | "div"    |
| id           | Unique identifier of the form input field.                               | string         | -      | ""       |
| name         | The name attribute for the form input field.                             | string         | -      | ""       |
| width        | The width of the form input field.<br/>`auto, expand`                    | string         | -      | "auto"   |
| size         | Sets the size of the input area `small, medium, large`                   | string         | -      | "medium" |
| rows         | The number of visible text lines for textarea.                           | string         | -      | "5"      |
| maxlength    | The maximum number of characters that the user can enter in textarea.    | number         | -      | 256      |
| disabled     | Whether the form input field is disabled or not.<br/>`true, false`       | boolean        | -      | false    |
| readonly     | Whether the form input field is readonly or not.<br/>`true, false`       | boolean        | -      | false    |
| required     | Whether the form input field is required or not.<br/>`true, false`       | boolean        | -      | false    |
| hover        | Manually trigger input field’s hover state.<br/>`true, false`            | boolean        | -      | false    |
| focused      | Manually trigger input field’s focus state.<br/>`true, false`            | boolean        | -      | false    |
| icon         | Appends icon inside container. Option:<br/>`alert`, `approved`, `denied` | string         | -      | ""       |

### Events

| Event name       | Properties | Description |
| ---------------- | ---------- | ----------- |
| change           |            |
| keyup            |            |
| blur             |            |
| inputvaluechange |            |
| inputblur        |            |
| inputfocus       |            |
| update:value     |            |
| input            |            |
| focus            |            |

---

```jsx
  <div>
    <lux-input-text id="foo" name="value" label="Input" :hide-label="true" placeholder="Write your text" helper="This is helper text to help the user fill out this field" size="large" required></lux-input-text>
    <lux-input-text id="foo" name="value" label="Input" :hide-label="true" placeholder="Write your text" helper="This is helper text to help the user fill out this field"></lux-input-text>
    <lux-input-text id="foo" name="value" label="Input" :hide-label="true" placeholder="Write your text" helper="This is helper text to help the user fill out this field" size="small"></lux-input-text>

    <lux-input-text id="bar" name="value" label=":hover" hover placeholder="Write your text"></lux-input-text>
    <!-- use :focused sparingly and only when necessary to set the focus; uncomment below to test in preview above  -->
    <!--<lux-input-text id="fee" name="value" label=":focused" focused placeholder="Write your text"></lux-input-text>-->
    <lux-input-text id="foe" name="value" label="[disabled]" disabled placeholder="Disabled input"></lux-input-text>
    <lux-input-text id="foe" name="value" label="Textarea" type="textarea"></lux-input-text>

    <!-- with icons -->
    <lux-input-text id="foo" name="value" label="Icon" placeholder="Write your text" icon="alert"></lux-input-text>
    <lux-input-text id="foo" name="value" label="Icon" placeholder="Write your text" icon="calendar"></lux-input-text>
  </div>
```

## \_LuxCardContent

> Used to establish a section of a card for supplementary content.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "div"   |

### Slots

| Name    | Description                           | Bindings |
| ------- | ------------------------------------- | -------- |
| default | The supplementary conent in your card |          |

---

```jsx
<div>
  <lux-card-content>
    <lux-text-style type="span" variation="small">
      <lux-icon-base width="18" height="18">
        <lux-icon-approved></lux-icon-approved>
      </lux-icon-base>
      Approved
    </lux-text-style>
  </lux-card-content>
</div>
```

## \_LuxCardHeader

> Used to establish a section of a card for the primary title of the card.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "div"   |

### Slots

| Name    | Description                                                                                                             | Bindings |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| default | The header content. You should probably include a LuxHeading component in this slot to provide good document structure. |          |

---

```jsx
<div>
  <lux-card-header>
    <lux-heading level="h2" size="h3">
      Title
    </lux-heading>
    <lux-text-style>Secondary title</lux-text-style>
  </lux-card-header>
</div>
```

## \_LuxCardMedia

> Used to establish a section of a card for rich media content and icons.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "div"   |

### Slots

| Name    | Description                                                  | Bindings |
| ------- | ------------------------------------------------------------ | -------- |
| default | the media content or icon you'd like to include in your card |          |

---

```jsx
<div>
  <lux-card-media>
    <lux-icon-base width="50" height="50">
      <lux-icon-globe></lux-icon-globe>
    </lux-icon-base>
  </lux-card-media>
</div>
```

## \_LuxCreativeCommonsStatement

> Used to show the University’s creative commons statement

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "div"   |
| theme     |                                             | string | -      | "dark"  |

---

```jsx
<div>
  <lux-creative-commons-statement
    theme="light"
    type="span"
  ></lux-creative-commons-statement>
</div>
```

## \_LuxHamburger

> Used in conjunction with LuxMenuBar to display a menu on narrow screens.

---

```jsx
<div>
  <lux-hamburger></lux-hamburger>
</div>
```

## \_LuxMenuBarLabel

### Props

| Prop name | Description | Type   | Values | Default |
| --------- | ----------- | ------ | ------ | ------- |
| item      |             | object | -      |         |

---

```jsx
    <ul>
    <li><lux-menu-bar-label :item="
    {name: 'Logout', href: '/logout'}
    "/></li>
    <li><lux-menu-bar-label :item="
    {unsafe_name: 'Bookmarks <strong>(1 / 3)</strong>', href: '/logout'}
    "/></li>
```

Security considerations:

  <ul>
    <li>You can add any arbitrary HTML to the <code>unsafe_name</code> property,
      and it will be rendered for the user.  If you don't need to add arbitrary
      HTML, use the <code>name</code> property instead.  Don't bind the
      <code>unsafe_name</code> property to any user-provided value, since it does
      not have Cross-Site Scripting protections (<code>name</code> does have these
      protections).
    </li>
  </ul>

## \_LuxSubscribeNewsletter

> Used to add a Subscribe Newsletter input.

### Props

| Prop name   | Description                                 | Type   | Values | Default     |
| ----------- | ------------------------------------------- | ------ | ------ | ----------- |
| type        | The html element name used for the wrapper. | string | -      | "div"       |
| buttonLabel |                                             | string | -      | "Subscribe" |

---

```jsx
<div>
  <lux-subscribe-newsletter type="div"></lux-subscribe-newsletter>
</div>
```

## \_LuxUniversityAccessibility

> Used to show the University’s Accessibility site in the footer.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "span"  |
| theme     |                                             | string | -      | "dark"  |

---

```jsx
<div>
  <lux-university-accessibility
    theme="light"
    type="span"
  ></lux-university-accessibility>
</div>
```

## \_LuxUniversityAccessibilityOld

> Used to show the University’s Accessibility site in the footer.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "span"  |

---

```jsx
<div>
  <lux-university-accessibility-old type="span"></lux-university-accessibility-old>
</div>
```

## \_LuxLibraryContactInfo

> Used to show Library's contact information, including address and phone, is
> clear and in the footer.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "div"   |
| theme     |                                             | string | -      | "dark"  |

---

```jsx
<div>
  <lux-library-contact-info type="div" theme="light"></lux-library-contact-info>
</div>
```

## \_LuxLibraryContactInfoOld

> Used to show Library's contact information, including address and phone, is
> clear and in the footer.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "div"   |

---

```jsx
<div>
  <lux-library-contact-info-old type="div"></lux-library-contact-info-old>
</div>
```

## \_LuxUniversityCopyright

> Used to show the University’s copyright notice, including the current year
> (“© 20xx The Trustees of Princeton University”) in the footer.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "span"  |
| theme     |                                             | string | -      | "dark"  |

---

```jsx
<div>
  <lux-university-copyright
    theme="light"
    type="span"
  ></lux-university-copyright>
</div>
```

## \_LuxUniversityCopyrightOld

> Used to show the University’s copyright notice, including the current year
> (“© 20xx The Trustees of Princeton University”) in the footer.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "span"  |

---

```jsx
<div>
  <lux-university-copyright-old type="span"></lux-university-copyright-old>
</div>
```

## \_LuxUniversityPrivacyNotice

> Used to show the University’s Privacy Notice site in the footer.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "span"  |
| theme     |                                             | string | -      | "dark"  |

---

```jsx
<div>
  <lux-university-privacy-notice
    theme="light"
    type="span"
  ></lux-university-privacy-notice>
</div>
```

## LuxBanner

> Banners are used to provide timely, general information to users of a website or app.

### Props

| Prop name   | Description                                                         | Type    | Values | Default |
| ----------- | ------------------------------------------------------------------- | ------- | ------ | ------- |
| fullscreen  | Allows the banner to act as an overlay, near the top of the screen. | boolean | -      | false   |
| dismissible | User can manually hide the notification.                            | boolean | -      | false   |

### Slots

| Name    | Description                  | Bindings |
| ------- | ---------------------------- | -------- |
| default | The content for your banner. |          |

---

```jsx
<div>
  <lux-banner dismissible>
    <h2>Fall Semester Announcements</h2>
    <p>
      We’re currently in beta for students and will be introducing faculty,
      advisor and staff functionality in the coming months.
    </p>
  </lux-banner>
</div>
```

## LuxCard

> Cards are used to apply a container around a related grouping of information.

### Props

| Prop name      | Description                                                                              | Type    | Values | Default  |
| -------------- | ---------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| id             | Sets the id to reference this card with.                                                 | string  | -      | ""       |
| cardUrl        | Sets the URL linking to the card content -- this does not seem to be used                | string  | -      | ""       |
| cardPixelWidth | Sets arbitrary card width. It's recommended to use size over this setting.               | string  | -      | ""       |
| size           | Sets the size of the card `small, medium, large, full-width`                             | string  | -      | "medium" |
| selected       | Indicates whether the card is selected.                                                  | boolean | -      | false    |
| edited         | Indicates whether the object a card represents has been altered from its persisted form. | boolean | -      | false    |
| disabled       | Indicates the user cannot interact with the card.                                        | boolean | -      | false    |
| cardTitle      | The title of the card -- this prop is not used                                           | string  | -      | ""       |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| card-click |            |

### Slots

| Name    | Description                                          | Bindings |
| ------- | ---------------------------------------------------- | -------- |
| default | The heading, media, and other contents of your card. |          |

---

```
    <div>
      <!-- Card without sections -->
      <lux-card id="a">
        <lux-media-image src="https://picsum.photos/600/300/?random" height="medium" cover></lux-media-image>
        <lux-heading level="h2">Title</lux-heading>
        <lux-text-style variation="default">Design isn't just about the look and feel. Design is how it works.</lux-text-style>
      </lux-card>

      <!-- Card with sections -->
      <lux-card id="b" size="full-width">
        <lux-card-media>
          <lux-icon-base width="50" height="50" icon-hide="true">
            <lux-icon-globe></lux-icon-globe>
          </lux-icon-base>
        </lux-card-media>
        <lux-card-header>
          <!-- Hyperlink is the text screen readers would read, we don't want to wrap the entire card -->
          <lux-heading level="h2" size="h3"><lux-hyperlink href="#">Code4Lib - Trip ID 1234</lux-hyperlink></lux-heading>
          <lux-text-style>Jan 9, 2019 to Jan 16, 2019</lux-text-style>
        </lux-card-header>
        <lux-card-content>
          <lux-tag type="tag" :tag-items="[
            {name: 'Pending', color: 'yellow', style: 'pill'}
            ]"
            horizontal="end"
            size="small"/>
          <lux-text-style type="span" variation="small">Last Updated on Dec 15, 2018</lux-text-style>
        </lux-card-content>
      </lux-card>
    </div>
```

## LuxCopyToClipboard

### Props

| Prop name      | Description                                                              | Type   | Values | Default |
| -------------- | ------------------------------------------------------------------------ | ------ | ------ | ------- |
| clipboardValue | the value to be copied to the clipboard. It can be a string or a number. | string | -      |         |

---

```
    <div>
      <!-- Copy to clipboard -->
      <div style="display: flex; align-items: center; gap: 0.5rem;">
      <div>example to be copied</div>
      <lux-copy-to-clipboard id="example-clip" clipboard-value="example to be copied"> </lux-copy-to-clipboard>
      </div>
    </div>
```

## LuxDataTable

> Used to display data to end users.

### Props

| Prop name    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Type   | Values | Default |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------ | ------- |
| caption      | caption provides context for the data that is helpful to users, particularly those who use screenreaders.<br/>`e.g. [name, title, age]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | string | -      |         |
| summaryLabel | summaryLabel provides context to the data values in tfoot element cells.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | string | -      |         |
| columns      | columns define the columns and order for which the data should be displayed.<br/>Columns entries can be simple strings, or they may be more complicated objects<br/>that can define `name`, `display_name`,`align`, `sortable`, and `checkbox` properties.<br/>Sorting on `numeric` or `currency` values requires a column to have<br/>a `datatype='number'` or `datatype='currency'` property.<br/>Sorting on `date` values requires a column to have<br/>a `datatype='date'` property.<br/>Use `checkbox=true` to create a checkbox whose value is the value for that<br/>column value for the row in the table.<br/>`e.g. ['name', 'email', 'age']` | array  | -      |         |
| jsonData     | jsonData is supplied via Array with an object representing each row.<br/>Applying links to data cell content can be achieved by supplying an object<br/>that contains a `value` and `link` property. Date sorting uses the JavaScript<br/>`datestring` parameter. Shorthand dates are supported in most browsers, but can be implementation-specific.<br/>(e.g., `{ value: 'content', link: 'https://url.com'}`)<br/>See above example for exact structure.                                                                                                                                                                                            | array  | -      |         |

---

```jsx
    <lux-data-table caption="Staff Emails" summary-label="Average"
      :columns="[
        { 'name': 'id', 'display_name': 'Select Items', 'align': 'center', 'checkbox': true },
        'name',
        { 'name': 'email', 'display_name': 'Email Address', 'align': 'center', 'sortable': true },
        { 'name': 'birthday', 'datatype': 'date', 'sortable': true },
        { 'name': 'age', 'datatype': 'number', 'summary_value': '33', 'sortable': true }
      ]"
      :json-data="[
        {'id': 1,'name': { value: 'foo', link: 'https://library.princeton.edu'},'email': 'foo@xxx.xxx', 'age': 30, 'birthday': 'March 4, 1989' },
        {'id': 2,'name': 'bar','email': 'bar@xxx.xxx', 'age': 44, 'birthday': 'October 4, 1975' },
        {'id': 3,'name': 'fez','email': 'fez@xxx.xxx', 'age': 19, 'birthday': 'May 14, 2000' },
        {'id': 4,'name': 'hey','email': 'hey@xxx.xxx', 'age': 19 , 'birthday': 'May 5, 2000'},
      ]"/>
```

## LuxDatePicker

### Props

| Prop name     | Description                                                                                                                                                                                                                                                                                                                                  | Type    | Values | Default  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| mode          | Allows for a single date or a date range to be selected. Possible values are: `single, range`.                                                                                                                                                                                                                                               | string  | -      | "single" |
| label         | The label of the form input field.                                                                                                                                                                                                                                                                                                           | string  | -      | ""       |
| id            | Unique identifier of the form input field.                                                                                                                                                                                                                                                                                                   | string  | -      | ""       |
| name          | The name attribute for the form input field.                                                                                                                                                                                                                                                                                                 | string  | -      | ""       |
| width         | The width of the form input field.<br/>`auto, expand`                                                                                                                                                                                                                                                                                        | string  | -      | "auto"   |
| size          | Sets the size of the input area `small, medium, large`                                                                                                                                                                                                                                                                                       | string  | -      | "medium" |
| required      | Whether the form input field is required or not.<br/>`true, false`                                                                                                                                                                                                                                                                           | boolean | -      | false    |
| placeholder   | Placeholder text to display                                                                                                                                                                                                                                                                                                                  | string  | -      | ""       |
| defaultDate   | defaultDate offers a way to add data that may already exist for the field when `mode='single'`.<br/>It takes the form of a Javascript Date object.<br/>Example: `:defaultDate="new Date(2019, 05, 01)"`                                                                                                                                      | date    | -      | null     |
| defaultDates  | defaultDates offer a way to add data that may already exist for the field when `mode='range'`.<br/>It takes the form of an Object containing two properties (start and,<br/>optionally, end date) with values that are Javascript date objects.<br/>Example: `:defaultDates="{ start: new Date(2019, 05, 01), end: new Date(2019, 05, 02)}"` | object  | -      | null     |
| disabledDates | Disable dates using the date object or date range format. This example makes the<br/>month of June 2019 selectable, but nothing else: `[{ start: null, end: new Date(2019, 05, 01)}, { start: new Date(2019, 05, 30), end: null }]`<br/>Note: In Javascript, months start at zero, which is why 05 = June.                                   | array   | -      | null     |
| holidays      | Highlight PUL holidays using an array of strings in YYYY-MM-DD format. Example: ["2019-11-28","2019-11-29"]                                                                                                                                                                                                                                  | array   | -      | null     |
| helper        | The helper text a user should get.                                                                                                                                                                                                                                                                                                           | string  | -      | ""       |
| icon          |                                                                                                                                                                                                                                                                                                                                              | string  | -      | ""       |
| components    |                                                                                                                                                                                                                                                                                                                                              | -       | -      |          |

### Events

| Event name       | Properties | Description |
| ---------------- | ---------- | ----------- |
| updateInput      |            |
| updateRangeInput |            |

---

```jsx
    <div>
      <lux-date-picker id="dateRange" name="daterange" label="Date Range" helper="Please enter both start and end dates." mode="range" :disabled-dates="[{ start: null, end: new Date(2019, 05, 01)}, { start: new Date(), end: null }]"  placeholder="01/10/2020" />

      <lux-date-picker id="today" name="today" label="Today's Date" mode="single" :holidays="['2020-02-20','2020-02-21']" :defaultDate="new Date()" />
    </div>
```

## LuxGridContainer

> Used to build the container of GridItems.

### Props

| Prop name  | Description                                                                                                                                                             | Type   | Values | Default |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------- |
| type       | The html element name used for the grid container.                                                                                                                      | string | -      | "div"   |
| horizontal | Determines how the flexbox container is horizontally aligned. This value defaults to<br/>having space between grid items. Options include `start`, `center`, and `end`. | string | -      | ""      |

### Slots

| Name    | Description                                      | Bindings |
| ------- | ------------------------------------------------ | -------- |
| default | The grid items that live in your grid container. |          |

---

```jsx
<div>
  <lux-grid-container>
    Grid container can be used to contain grid items together.
  </lux-grid-container>
</div>
```

## LuxGridItem

> Used to build the containers to layout a page. Grid items need to be nested inside a `GridContainer`
> component. Do not nest grid items inside other grid items.

### Props

| Prop name | Description                                                                                                                                                                                                                                                                                            | Type    | Values | Default |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ | ------- |
| type      | The html element name used for the container.                                                                                                                                                                                                                                                          | string  | -      | "div"   |
| columns   | Sets the size of the column. Prefix with `sm-` or `lg-`. Based on a 12 column grid.<br/>The inclusion of `auto` will set that grid item to have a width based on the width and height of the content.<br/>The inclusion of `fill` will set the grid item to have a width based on the space available. | string  | -      | ""      |
| order     | Sets the order to lay out an item in a grid container.                                                                                                                                                                                                                                                 | string  | -      | ""      |
| offset    | Pushes grid items to the right side of the container.                                                                                                                                                                                                                                                  | boolean | -      | false   |
| vertical  | Sets the vertical alignment of the item. `start`, `center`, or `end`. For horizontal alignment, please look at the grid-container component.                                                                                                                                                           | string  | -      | ""      |

### Slots

| Name    | Description                    | Bindings |
| ------- | ------------------------------ | -------- |
| default | The content of your grid item. |          |

---

```jsx
    <div>
      <lux-grid-container>
        <lux-grid-item columns="lg-9 sm-6">Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <!-- passing "auto" as a value in columns will size the grid item based on width and height of the item with space between each grid item -->
        <lux-grid-item columns="lg-3 sm-6 auto" :offset="true">
          <lux-dropdown-menu type="links" button-label="Select Options" :menu-items="[
            {name: 'Vegetable', component: 'Vegetable', disabled: true},
            {name: 'Fruit', component: 'Fruit'},
            {name: 'Apple', component: 'Apple', parent: 'Fruit'},
            {name: 'Lettuce', component: 'Lettuce', parent: 'Vegetable'},
            {name: 'Carrot', component: 'Carrot', parent: 'Vegetable'},
            {name: 'Pear', component: 'Pear', parent: 'Fruit'},
          ]"></lux-dropdown-menu>
        </lux-grid-item>
      </lux-grid-container>

      <!-- inline styling for demonstration purposes only -->
      <lux-grid-container horizontal="center" style="height:200px;">
        <lux-grid-item columns="lg-3" vertical="start" style="border: 1px solid black; padding: 1rem;">Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <lux-grid-item columns="lg-3 auto" vertical="center" style="border: 1px solid black; padding: 1rem;" :offset="true">Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <lux-grid-item columns="lg-3" vertical="end" style="border: 1px solid black; padding: 1rem;">Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
      </lux-grid-container>

      <!-- inline styling for demonstration purposes only -->
      <lux-grid-container horizontal="center" style="height:200px;">
        <lux-grid-item columns="lg-3" order="order-sm-3 order-lg-1" vertical="start" style="border: 1px solid black; padding: 1rem;">First - Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <lux-grid-item columns="lg-3 auto" order="order-sm-2 order-lg-2" vertical="center" style="border: 1px solid black; padding: 1rem;" :offset="true">Second - Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <lux-grid-item columns="lg-3" order="order-sm-1 order-lg-3" vertical="end" style="border: 1px solid black; padding: 1rem;">Third - Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
      </lux-grid-container>
    </div>
```

## LuxHeading

> Headings are used as the titles of each major section of a page in the
> interface. For example, templates generally use headings as their title.
> Heading element provides an option to change the level of the heading.

### Props

| Prop name | Description                                                          | Type    | Values | Default |
| --------- | -------------------------------------------------------------------- | ------- | ------ | ------- |
| level     | The heading level used for the heading.<br/>`h1, h2, h3, h4, h5, h6` | string  | -      | "h1"    |
| size      | The size of the heading.<br/>`h1, h2, h3, h4, h5, h6`                | string  | -      | "h1"    |
| hidden    | Whether the heading is visually hidden or not.<br/>`true, false`     | boolean | -      | false   |

### Slots

| Name    | Description               | Bindings |
| ------- | ------------------------- | -------- |
| default | The text of your heading. |          |

---

```jsx
<div>
  <lux-heading level="h1" hidden>
    The quick brown fox
  </lux-heading>
  <lux-heading level="h2" size="h1">
    The quick brown fox
  </lux-heading>
  <lux-heading level="h3" size="h3">
    The quick brown fox
  </lux-heading>
  <lux-heading level="h4" size="h5">
    The quick brown fox
  </lux-heading>
</div>
```

```jsx noeditor
<div class="dos-n-donts">
  <div class="do">
    <div class="do-dont-example">
      <lux-heading level="h1">This is an h1</lux-heading>
      <lux-heading level="h2" size="h2">
        This is an h2
      </lux-heading>
    </div>
    <p>
      Nest headings appropriately by level. You can pick the desired font size
      with the size prop.
    </p>
  </div>

  <div class="dont">
    <div class="do-dont-example">
      <lux-heading level="h2" size="h2">
        This is an h2
      </lux-heading>
      <lux-heading level="h1">This is an h1</lux-heading>
    </div>
    <p>
      If you nest headings out of order or skip levels, the lack of organization
      of content on the page will confuse users.
    </p>
  </div>
</div>
```

## LuxHyperlink

> Used to create hyperlinks as text or buttons. Can also be used on Card component
> sub-elements to make the entire card click-able.

### Props

| Prop name | Description                                                                                               | Type    | Values | Default  |
| --------- | --------------------------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| href      | The href value of the link.                                                                               | string  | -      | ""       |
| variation | Whether the link appears as text or as a button. Options include `button solid`<br/>and `button outline`. | string  | -      | "link"   |
| size      | Sets the size of the button `small`, `medium`, `large`                                                    | string  | -      | "medium" |
| newTab    | Should the link open in a new tab? This can be<br/>disconcerting, so don't use it unless necessary.       | boolean | -      | false    |
| underline | Should the link have an underline?                                                                        | boolean | -      | false    |

### Slots

| Name    | Description                 | Bindings |
| ------- | --------------------------- | -------- |
| default | The text of your hyperlink. |          |

---

```jsx
    <div>
      <lux-hyperlink href="#">Foo</lux-hyperlink>
      <lux-hyperlink href="#" variation="button solid">Bar</lux-hyperlink>
      <lux-hyperlink href="#" variation="button solid" size="large">Bar</lux-hyperlink>
      <lux-hyperlink href="#" variation="button outline">Bar</lux-hyperlink>
      <lux-hyperlink href="#" :newTab="true">I open in a new tab</lux-hyperlink>
      <lux-hyperlink href="#" :underline="true">
        I am underlined and have an arrow
        <lux-icon-base width="14" height="14">
          <lux-icon-arrow-right></lux-icon-arrow-right>
        </lux-icon-base>
      </lux-hyperlink>
    </div>
```

## LuxLoader

> Loaders indicate to the user that the component is waiting for some task to finish
> before updating the view.

### Props

| Prop name  | Description                                                                                                 | Type    | Values | Default  |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| size       | Sets the diameter of the circle. `x-small, small, medium, large, x-large`                                   | string  | -      | "medium" |
| fullscreen | Determines whether the loader fills the entire screen (with overlay) or the container it's in (no overlay). | boolean | -      | false    |
| wrapper    | The html element name used for the wrapper.<br/>`div, section`                                              | string  | -      | "div"    |

---

```jsx
<div>
  <lux-loader size="medium"></lux-loader>
</div>
```

## LuxLibraryHeader

> LibraryHeader is the preferred Header styling/behavior for PUL websites.
> Don't forget to create a fallback for this component by also providing the HTML
> rendering in _<noscript></noscript>_ tags.

### Props

| Prop name | Description                                                          | Type   | Values | Default |
| --------- | -------------------------------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the container                         | string | -      | "div"   |
| appName   | The name of the application or site                                  | string | -      | ""      |
| abbrName  | The abbreviation of the application or site's name                   | string | -      | ""      |
| appUrl    | The URL of landing page for the application or site                  | string | -      | ""      |
| maxWidth  | The maximum width of the wrapper. Default is set to 1440.            | number | -      | 1440    |
| theme     | Whether the header is dark, shade, or light. Default is set to dark. | string | -      | "dark"  |

### Slots

| Name    | Description                                                                                                           | Bindings |
| ------- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| logo    | A custom logo to display in the Header. If no logo is provided, it defaults to the Princeton University Library logo. |          |
| default | The content of the header, such as a navigation menu.                                                                 |          |

---

```jsx
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
```

```jsx noeditor
<div class="dos-n-donts">
  <div class="do">
    <div class="do-dont-example">
      <lux-library-header></lux-library-header>
      <noscript>Place fallback header here.</noscript>
    </div>
    <p>
      Make sure users with JavaScript disabled can see important parts of the
      page by using &lt;noscript&gt; tags.
    </p>
  </div>

  <div class="dont">
    <div class="do-dont-example">
      <lux-spacer></lux-spacer>
      <p>? ? ? </p>
      <lux-spacer></lux-spacer>
    </div>
    <p>
      JavaScript-disabled browsers won't see any branding and may be missing
      important functionality.
    </p>
  </div>
</div>
```

You can pass in a custom logo via the logo slot. Wrap it in your home page
link if desired, and make sure to include an `alt` property on the `img` tag:

```jsx
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
```

## LuxLibraryFooter

> LibraryFooter is the preferred Footer styling/behavior for the PUL main
> website. Other sites tightly integrated with the main site may also want
> to use this footer.
> Don't forget to create a fallback for this component by providing the HTML
> rendering in _<noscript></noscript>_ tags.

### Props

| Prop name | Description                                                          | Type   | Values | Default |
| --------- | -------------------------------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the container                         | string | -      | "div"   |
| maxWidth  | The maximum width of the wrapper. Default is set to 1440.            | number | -      | 1440    |
| theme     | Whether the header is dark, shade, or light. Default is set to dark. | string | -      | "dark"  |

---

```jsx
<div>
  <lux-library-footer theme="dark"></lux-library-footer>
</div>
```

## LuxSpecialCollectionsFooter

> LibraryFooter is the preferred Footer styling/behavior for PUL websites.
> Don't forget to create a fallback for this component by providing the HTML
> rendering in _<noscript></noscript>_ tags.

### Props

| Prop name | Description                                               | Type   | Values | Default |
| --------- | --------------------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the container              | string | -      | "div"   |
| maxWidth  | The maximum width of the wrapper. Default is set to 1170. | number | -      | 1170    |

---

```jsx
<div>
  <lux-special-collections-footer></lux-special-collections-footer>
</div>
```

## LuxMediaImage

> Media-Image is a component that is used to display an image,
> or an icon if the image can't be resolved.

### Props

| Prop name | Description                                                                                                                                                                                                          | Type    | Values | Default |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| src       | The image displayed                                                                                                                                                                                                  | string  | -      | null    |
| alt       | The alternative text describing the image. Do not include if image is decorative.                                                                                                                                    | string  | -      | ""      |
| height    | Manually define the height of the image for a card                                                                                                                                                                   | string  | -      | ""      |
| cover     | Whether the image fills the container maintaining aspect ratio and is cropped                                                                                                                                        | boolean | -      | false   |
| contain   | Whether the full image is contained within the container maintaining aspect ratio. Note that this property is not recommened for use when the `height` prop is used as it will show the background of the container. | boolean | -      | false   |

---

```
  <div>
    <lux-media-image src="https://picsum.photos/400/300/?random" height="medium"></lux-media-image>
  </div>
```

## LuxMenuBar

> Used as main page navigation in templates.

### Props

| Prop name | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Type   | Values | Default |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------ | ------- |
| type      | The html element types used for the nav bar. Passing 'href' in menuItems<br/>will only work if type = "links".<br/>`links, buttons`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | string | -      | "links" |
| active    | State which tab is active when initiated (using name of the component).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | string | -      |         |
| menuItems | Menu items are options to be displayed to the user. They have several possible properties:<br/>&lt;dl&gt;&lt;dt&gt;&lt;code&gt;name&lt;/code&gt;&lt;/dt&gt;&lt;dd&gt;The text that is displayed for this menu item&lt;/dd&gt;<br/>&lt;dt&gt;&lt;code&gt;href&lt;/code&gt;&lt;/dt&gt;&lt;dd&gt;If the type is links or main-menu, the url that the menu item links to.&lt;/dd&gt;<br/>&lt;dt&gt;&lt;code&gt;target&lt;/code&gt;&lt;/dt&gt;&lt;dd&gt;If the type is links or main-menu, where to display the linked URL (for example, &lt;code&gt;\_blank&lt;/code&gt; for a new tab).&lt;/dd&gt;<br/>&lt;dt&gt;&lt;code&gt;children&lt;/code&gt;&lt;/dt&gt;&lt;dd&gt;An array of items that should display below the current item hierarchically.&lt;/dd&gt;<br/>&lt;dt&gt;&lt;code&gt;disabled&lt;/code&gt;&lt;/dt&gt;&lt;dd&gt;If the type is buttons, whether or not the button should be disabled.&lt;/dd&gt;<br/>&lt;dt&gt;&lt;code&gt;component&lt;/code&gt;&lt;/dt&gt;&lt;dd&gt;Optional. An identifier you can use in conjunction with the &lt;code&gt;active&lt;/code&gt; prop.&lt;/dd&gt;<br/>&lt;dt&gt;&lt;code&gt;unsafe_name&lt;/code&gt;&lt;/dt&gt;&lt;dd&gt;Optional. If you need to include some arbitrary HTML in the menu item text, you can here and it will override the label provided in &lt;code&gt;name&lt;/code&gt;. Don't bind the &lt;code&gt;unsafe_name&lt;/code&gt; property to any user-provided value, since it does not have Cross-Site Scripting protections (&lt;code&gt;name&lt;/code&gt; does have these protections).&lt;/dd&gt;<br/>&lt;dt&gt;&lt;code&gt;method&lt;/code&gt;&lt;/dt&gt;&lt;dd&gt;Optional. For use in conjunction with Rails applications that use UJS to link to non-GET HTTP methods, like POST or DELETE. To mimic a Rails link_to helper for an item, pass the HTTP method with a `method` property.&lt;/dd&gt;<br/>&lt;/dl&gt; | array  | -      |         |
| theme     | Whether the header is dark, shade, or light. Default is set to dark.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | string | -      | "dark"  |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| input             |            |
| menu-item-clicked |            |

---

```jsx
    <lux-menu-bar type="main-menu" active="Dashboard" :menu-items="[
      {name: 'Dashboard', component: 'Dashboard', href: '/example/'},
      {name: 'Posts', component: 'Posts', href: '/example/'},
      {name: 'Requests', component: 'Requests', href: '/example/', children: [
        {name: 'New Travel Request', component: 'New Travel Request', href: '/example/'},
        {name: 'New Leave Request', component: 'New Leave Request', href: '/example/'}
      ]},
      {name: 'Users', component: 'Users', href: '/example/', children: [
        {name: 'External Site', component: 'External Site', href: 'http://princeton.edu', target: '_blank'},
        {name: 'Settings', component: 'Settings', href: '/example/'},
        {name: 'Logout', component: 'Logout', href: '/example/'}
      ]}
    ]"/>

    <lux-menu-bar type="links" active="Dashboard" :menu-items="[
      {name: 'Logout', component: 'Logout', href: '/logout'}]" theme="light"/>
```

## LuxTextStyle

> Text style enhances text with additional visual meaning. For example, using
> disabled text to de-emphasize it from its surrounding text. Don’t use text
> styles only for aesthetic effect.

### Props

| Prop name | Description                                                                                                     | Type   | Values | Default                   |
| --------- | --------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------------------------- |
| type      | The html element name used for the text                                                                         | string | -      | "p"                       |
| variation | Style variation to give additional meaning.<br/>`default, disabled, strong, positive, negative,small,uppercase` | string | -      | "default"                 |
| color     |                                                                                                                 | string | -      | "var(--color-rich-black)" |

### Slots

| Name    | Description                  | Bindings |
| ------- | ---------------------------- | -------- |
| default | The text you'd like to style |          |

---

```
  <div>
    <lux-text-style variation="default">Design isn’t just about the look and feel. Design is how it works.</lux-text-style>
    <lux-text-style variation="disabled">Design isn’t just about the look and feel.</lux-text-style>
    <lux-text-style variation="strong">Design isn’t just about look and feel.</lux-text-style>
    <lux-text-style variation="emphasis">Design is how it works.</lux-text-style>
    <lux-text-style variation="strong" color="red">Design is how it works.</lux-text-style>
  </div>
```

## LuxWrapper

> Used to build the outer wrapper of a page, including the page title and
> associated actions. Wrapper can be span the full width of the viewport or limited to a max-width of 1440px.

### Props

| Prop name  | Description                                                                                                                                                           | Type            | Values | Default |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------ | ------- |
| type       | The html element name used for the wrapper.                                                                                                                           | string          | -      | "div"   |
| maxWidth   | The maximum width of the wrapper. Default is set to 1440.                                                                                                             | string\|number  | -      | 1440    |
| fullWidth  | Determines whether the wrapper takes up 100% of the parent container.                                                                                                 | string\|boolean | -      | false   |
| horizontal | Determines how the flexbox wrapper is horizontally aligned. This value defaults to<br/>having space between grid items. Options include `start`, `center`, and `end`. | string          | -      | ""      |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

```jsx
    <div>
      <lux-wrapper>Wrapper can be used to wrap any components together.</lux-wrapper>
      <lux-wrapper :max-width="1400">Wrapper can be used to wrap any components together.</lux-wrapper>
    </div>
```

## LuxLibraryLogo

> Used to identify that the site is a Princeton University site in the footer
> and links to princeton.edu.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "div"   |
| theme     | Whether the theme is dark or light.         | string | -      | "dark"  |

---

```jsx
<div>
  <lux-library-logo theme="light"></lux-library-logo>
</div>
```

## LuxSpacer

> Used to fill available space or make space between two components.

### Props

| Prop name | Description                                 | Type   | Values | Default |
| --------- | ------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the wrapper. | string | -      | "div"   |

### Slots

| Name    | Description                                   | Bindings |
| ------- | --------------------------------------------- | -------- |
| default | Optional: some content that should be spaced. |          |

---

```jsx
<div>
  <lux-spacer></lux-spacer>
</div>
```

## LuxLogoFacebook

> Facebook logo for social media sharing purposes.

### Props

| Prop name | Description             | Type           | Values | Default |
| --------- | ----------------------- | -------------- | ------ | ------- |
| width     | The width of the logo.  | number\|string | -      | 24      |
| height    | The height of the logo. | number\|string | -      | 24      |

---

```jsx
<div>
  <lux-logo-facebook></lux-logo-facebook>
</div>
```

## LuxLogoFriends

> Official logo for Friends of PUL.

### Props

| Prop name | Description             | Type           | Values | Default |
| --------- | ----------------------- | -------------- | ------ | ------- |
| width     | The width of the logo.  | number\|string | -      | 115     |
| height    | The height of the logo. | number\|string | -      | 31      |

---

```jsx
<div>
  <lux-logo-friends></lux-logo-friends>
</div>
```

## LuxLogoGovDocs

> Government Docs site logo.

### Props

| Prop name | Description             | Type           | Values | Default |
| --------- | ----------------------- | -------------- | ------ | ------- |
| width     | The width of the logo.  | number\|string | -      | 32      |
| height    | The height of the logo. | number\|string | -      | 32      |

---

```jsx
<div>
  <lux-logo-gov-docs></lux-logo-gov-docs>
</div>
```

## LuxLogoInstagram

> Instagram logo for social media sharing purposes.

### Props

| Prop name | Description             | Type           | Values | Default |
| --------- | ----------------------- | -------------- | ------ | ------- |
| width     | The width of the logo.  | number\|string | -      | 24      |
| height    | The height of the logo. | number\|string | -      | 24      |

---

```jsx
<div>
  <lux-logo-instagram></lux-logo-instagram>
</div>
```

## LuxLogoLibrary

> Official Princeton University Library Brandmark and Wordmark combination Logo.
> Please, note that the white type on the first example below is not visible due
> to the white background color of the preview box.

### Props

| Prop name | Description                 | Type           | Values | Default   |
| --------- | --------------------------- | -------------- | ------ | --------- |
| width     | The width of the logo.      | number\|string | -      | 440       |
| height    | The height of the logo.     | number\|string | -      | 97        |
| color     | The color of the logo text. | string         | -      | "#ffffff" |

---

```jsx
<div>
  <lux-logo-library></lux-logo-library>
  <lux-logo-library color="#000000"></lux-logo-library>
</div>
```

## LuxLogoLibraryIcon

> Official Princeton University Library Brandmark Logo.

### Props

| Prop name | Description             | Type           | Values | Default                                  |
| --------- | ----------------------- | -------------- | ------ | ---------------------------------------- |
| width     | The width of the logo.  | number\|string | -      | 97                                       |
| height    | The height of the logo. | number\|string | -      | 97                                       |
| color     |                         | string         | -      | "var(--color-princeton-orange-on-black)" |

---

```jsx
<div>
  <lux-logo-library-icon></lux-logo-library-icon>
</div>
```

## LuxLogoX

> X logo for social media sharing purposes.

### Props

| Prop name | Description             | Type           | Values | Default |
| --------- | ----------------------- | -------------- | ------ | ------- |
| width     | The width of the logo.  | number\|string | -      | 24      |
| height    | The height of the logo. | number\|string | -      | 24      |

---

```jsx
<div>
  <lux-logo-x></lux-logo-x>
</div>
```

## LuxLogoUniversity

> Official Princeton University Logo

### Props

| Prop name | Description             | Type           | Values | Default |
| --------- | ----------------------- | -------------- | ------ | ------- |
| width     | The width of the logo.  | number\|string | -      | 263     |
| height    | The height of the logo. | number\|string | -      | 72      |

---

```jsx
<div>
  <lux-logo-university></lux-logo-university>
</div>
```

## LuxLogoUniversityWhite

> Official Princeton University Logo - black & white

### Props

| Prop name | Description             | Type           | Values | Default |
| --------- | ----------------------- | -------------- | ------ | ------- |
| width     | The width of the logo.  | number\|string | -      | 263     |
| height    | The height of the logo. | number\|string | -      | 72      |

---

```jsx
<div>
  <lux-logo-university-white style="background-color:#000000"></lux-logo-university-white>
</div>
```

## LuxSearchBox

> The SearchBox is a wrapper for an input group consisting of an
> InputText and InputButton. It has a default look and feel,
> which you can override by placing your own input and button
> within the default slot.

The default searchbox implements `v-model`. If you override
the default searchbox, you will have to implement it yourself.

### Props

| Prop name | Description                                                                             | Type   | Values              | Default   |
| --------- | --------------------------------------------------------------------------------------- | ------ | ------------------- | --------- |
| type      | The html element name used for the container                                            | string | -                   | "div"     |
| name      | The name of the input, which will be part of<br/>the URL after the search is submitted. | string | -                   | "query"   |
| corners   | Whether the corners should be rounded (default)<br/>or square.                          | string | `rounded`, `square` | "rounded" |

### Slots

| Name    | Description               | Bindings |
| ------- | ------------------------- | -------- |
| default | The input and its button. |          |

---

```jsx
    <div>
    <lux-search-box corners="square">
        <lux-input-text id="foo" name="value" label="Search" :hide-label="true" placeholder="Find all the things" size="large"></lux-input-text>
        <lux-input-button type="button" variation="icon" size="medium" icon="search"></lux-input-button>
    </lux-search-box>
    </div>

    <div>
      <!-- rounded is the default -->
      <lux-search-box corners="rounded">
      </lux-search-box>
    </div>
```

## LuxAlert

> Alerts are used to provide timely information to a user in response to some event.

### Props

| Prop name        | Description                                                                                                                                                                                                        | Type    | Values | Default     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ | ----------- |
| type             | The intent of the message. Valid options: `alert, indicator`. Alerts are full page and indicators are “inline”.                                                                                                    | string  | -      | "indicator" |
| status           | Severity of the message. Valid options: `info, warning, success, error`                                                                                                                                            | string  | -      | "info"      |
| autoclear        | Automatically hides the notification after 2 seconds.                                                                                                                                                              | boolean | -      | false       |
| autoclearSeconds | The number of seconds to wait before autoclearing the<br/>notification. This prop has no effect if autoclear<br/>is not true.                                                                                      | number  | -      | 2           |
| dismissible      | User can manually hide the notification. This emits a dismissed<br/>event that you can bind to if needed (for example, if you want to<br/>record that the user hid the notification in a database or localStorage) | boolean | -      | false       |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| dismissed  |            |

### Slots

| Name    | Description    | Bindings |
| ------- | -------------- | -------- |
| default | the alert text |          |

---

```jsx
<div>
  <lux-alert status="warning" autoclear>
    How to disappear completely...
  </lux-alert>
  <lux-alert status="error"></lux-alert>
  <lux-alert status="success">Like a boss!</lux-alert>
  <lux-alert status="info" dismissible>
    Here's some dismissible info for you.
  </lux-alert>
</div>
```

## LuxBadge

> Badge is a basic informational component with various color options.

### Props

| Prop name | Description                   | Type   | Values | Default |
| --------- | ----------------------------- | ------ | ------ | ------- |
| color     | Sets the color for the badge. | string | -      | "green" |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

```jsx
<div>
  <lux-badge>A Green Badge</lux-badge>
  <lux-badge color="yellow">A Yellow Badge</lux-badge>
  <lux-badge color="blue">A Blue Badge</lux-badge>
  <lux-badge color="gray">A Gray Badge</lux-badge>
  <lux-badge color="red">A Red Badge</lux-badge>
  <lux-badge color="purple">A Purple Badge</lux-badge>
</div>
```

## LuxDropdownMenu

> Dropdowns allows a user to select a value from a series of options. Note that a simple,
> two-level hierarchy (not recursive) is possible by adding a `children` property
> to the item and supplying sub-items using the same syntax as the top level items.

### Props

| Prop name   | Description                                                                                                                         | Type   | Values | Default    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ---------- |
| element     |                                                                                                                                     | string | -      | "div"      |
| buttonLabel | The menu items in the dropdown                                                                                                      | string | -      | "Dropdown" |
| type        | Whether the dropdown includes links or buttons as menu items<br/>`links, buttons`                                                   | string | -      | "buttons"  |
| menuItems   | An array of item (and sub-item) options for the DropdownMenu. Properties<br/>for menuItems are described in the LuxMenuBar pattern. | array  | -      | ["div"]    |
| align       | Alignment of menu items (not currently working)<br/>`left, right`                                                                   | string | -      | "left"     |
| size        | Sets the size of the dropdown menu area `small, medium, large`                                                                      | string | -      | "medium"   |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| button-clicked    |            |
| menu-item-clicked |            |

---

```jsx
    <lux-dropdown-menu type="links" button-label="Select Options" :menu-items="[
      {name: 'Vegetable'},
      {name: 'Fruit', children: [
        {name: 'Apple'},
        {name: 'Pear'},
      ]},
    ]">
    </lux-dropdown-menu>
```

## LuxAutocompleteInput

> InputAutocomplete is a cross between a text input and select input.
> This component is used to offer users suggested values that
> filter upon typing, while also allowing them to enter free-form text for the value.
> The id and name supplied to this component are applied to a hidden input field, which
> will contain the preferred value for submission based on the structure of the `items` prop.

### Props

| Prop name    | Description                                                                                                                                        | Type    | Values | Default |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| items        | The available items in the autocomplete. This can be a simple array of strings<br/>or an array of objects with an id and a label, if id is needed. | array   | -      | [""]    |
| placeholder  | The placeholder value for the form input field.                                                                                                    | string  | -      | null    |
| defaultValue | The default value for the form input field.                                                                                                        | string  | -      | ""      |
| label        | The label of the form input field.                                                                                                                 | string  | -      | ""      |
| hideLabel    | Visually hides the label of the form input field.                                                                                                  | boolean | -      | false   |
| id           | The id of the hidden form input field (which will contain the selected value)                                                                      | string  | -      | ""      |
| displayId    | The id of the visible form input field (where the user will enter their text)                                                                      | string  | -      |         |
| name         | The name of the form input field.                                                                                                                  | string  | -      | ""      |
| isAsync      | Is the data given by an outside ajax request?                                                                                                      | boolean | -      | false   |
| required     | Whether the form input field is required or not.<br/>`true, false`                                                                                 | boolean | -      | false   |
| focused      | Whether the input is focused or not<br/>`true, false`                                                                                              | boolean | -      | false   |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| input      |            |
| selected   |            |

### Expose

#### setResult

>

---

```jsx
    <div>
    <lux-autocomplete-input label="Fruit" default-value="Banana" :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']" />
    <lux-autocomplete-input label="Fruit with IDs" default-value="Banana" :items="[ {id: 1, label: 'Apple'}, {id: 2, label: 'Banana'}, {id: 3, label: 'Mango'}, {id: 4, label: 'Pineapple'}]" />
    </div>
```

## LuxShowMore

> LuxShowMore is used for long texts that are useful for some users, but
> disruptive for others. For example, some users find it helpful to have
> lengthy journal article abstracts available on a search results page,
> while for others the abstracts are unhelpful and cause substantial
> unnecessary scrolling.

### Props

| Prop name      | Description                                                                                                                                                                                           | Type   | Values | Default |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------- |
| showLabel      | A description of the action of showing the full content.                                                                                                                                              | string | -      |         |
| hideLabel      | A description of the action of hiding the full content.                                                                                                                                               | string | -      |         |
| contentId      | Used for setting focus and aria-controls. It must be unique in your page.                                                                                                                             | string | -      |         |
| descriptionId  | The ID of an element in the DOM that provides further description of the full content.<br/><br/>Use this prop if you have multiple disclosures in your page with the same `showLabel` or `hideLabel`. | string | -      |         |
| characterLimit | How many characters to allow                                                                                                                                                                          | number | -      |         |

### Slots

| Name    | Description                                                                       | Bindings |
| ------- | --------------------------------------------------------------------------------- | -------- |
| default | The full content that should be shown when the user presses the Show More button. |          |

---

```jsx
    <lux-heading level="h3" size="h4">Example 1</lux-heading>
    <!-- It shows a snippet of the provided text when collapsed -->
    <lux-show-more showLabel="More text" hideLabel="Less text" contentId="moby" character-limit="20">
      Call me Ishmael. Some years ago- never mind how long precisely- having little or no money in my purse,
      and nothing particular to interest me on shore, I thought I would sail about a little and see the watery
      part of the world. It is a way I have of driving off the spleen and regulating the circulation.
    </lux-show-more>


    <lux-heading level="h3" size="h4">Example 2</lux-heading>
    <!-- The content can contain HTML, but it will be stripped out of the snippet view -->
    <lux-show-more showLabel="Show full proem" hideLabel="Hide full proem" contentId="illiad" character-limit="80">
      μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος<br />
      οὐλομένην, ἣ μυρί’ Ἀχαιοῖς ἄλγε’ ἔθηκε,<br />
      πολλὰς δ’ ἰφθίμους ψυχὰς Ἄϊδι προΐαψεν<br />
      ἡρώων, αὐτοὺς δὲ ἑλώρια τεῦχε κύνεσσιν<br />
      οἰωνοῖσί τε δαῖτα, Διὸς δ’ ἐτελείετο βουλή,<br />
      ἐξ οὗ δὴ τὰ πρῶτα διαστήτην ἐρίσαντε<br />
      Ἀτρεΐδης τε ἄναξ ἀνδρῶν καὶ δῖος Ἀχιλλεύς.<br />
    </lux-show-more>

    <lux-heading level="h3" size="h4">Example 3</lux-heading>
    <!-- The content can even contain components -->
    <lux-show-more showLabel="Show full table" hideLabel="Hide full table" contentId="table" character-limit="20">
      There are three entries:
      <lux-data-table
        :columns="[
          'name',
          { 'name': 'email', 'display_name': 'Email Address', 'align': 'center', 'sortable': true },
        ]"
        :json-data="[
          {'id': 1,'name': { value: 'foo', link: 'https://library.princeton.edu'},'email': 'foo@xxx.xxx',},
          {'id': 2,'name': 'bar','email': 'bar@xxx.xxx' },
          {'id': 3,'name': 'fez','email': 'fez@xxx.xxx' },
        ]"/>
    </lux-show-more>
```

### How to use LuxShowMore

- Supply a `contentId` prop, which is used for setting focus and aria-controls. It must be unique in your page.
- Supply clear text for the `showLabel` and `hideLabel` props that orients the user to what the content
  is. The `hideLabel` text should provide a concise re-orientation to what the content is and how to dismiss it in the
  event that a user gets disoriented or distracted by the full content.
- If you use this component multiple times on the same page, make it clear to the user what each instance does, and
  how it might differ from other instances of the component. For example, please don't use this component 10 times in a page
  and use "Show more" as the label for each one. You can do this in one of two ways:
  _ Use distinct `showLabel` and `hideLabel` props for each instance
  _ Provide a `descriptionId` prop.

### Accessibility considerations

- Once the disclosure is opened, this component waits for a short amount of time for a screen reader's virtual buffer to update, then sets focus on the expanded content.
- This component implements the `aria-controls` and `aria-expanded` properties.
- If you use this component multiple times in the same page, try navigating your page via buttons on a screen reader (<kbd>Control+Option+Command+J</kbd> on Voice Over).
  Make sure that each instance has a specific and unique label.

  ## LuxTag

  > Tags are compact elements used for items that need to be labeled or categorized
  > using keywords that describe them. Tags are also used to represent applied filters.

Multiple or single tags can be used to categorize items.

### Props

| Prop name  | Description                                                                                                | Type   | Values | Default  |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ------ | ------ | -------- |
| type       | The type of tag. The `filter` option includes<br/>a remove icon inside the tag.                            | string | -      | "tag"    |
| tagItems   | Tag items are tags to be displayed to the user.<br/>You can pass a `name` and `href` in a tag-items array. | array  | -      |          |
| horizontal | Sets the horizontal alignment of the item. `start`, `center`, or `end`.                                    | string | -      |          |
| size       | Sets the size of the item.                                                                                 | string | -      | "medium" |
| label      | Sets the label of the list.                                                                                | string | -      | ""       |

---

```jsx
    <div>
      <lux-tag type="tag" :tag-items="[
        {name: 'Cats', href: '/tags/cats', color: 'red', icon: 'denied', style: 'pill'},
        {name: 'Cats', href: '/tags/cats', color: 'yellow', icon: 'alert'},
        {name: 'Cats', href: '/tags/cats', color: 'green', icon: 'approved'},
        {name: 'Cats', href: '/tags/cats', color: 'blue'},
        {name: 'Cats', color: 'blue'}
        ]"
        horizontal="end"/>

       <lux-tag type="filter" label="filtered by" :tag-items="[
        {name: 'Cats', href: '/tags/cats'},
        {name: 'Dogs', href: '/tags/dogs'}
        ]"/>
    </div>
```

## LuxTab

> Tabs are used to organize content into separate views, allowing users to switch between them.

Each LuxTab should be used as a child of LuxTabWrapper.

### Props

| Prop name | Description | Type   | Values | Default |
| --------- | ----------- | ------ | ------ | ------- |
| title     |             | string | -      |         |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

## LuxTabWrapper

> LuxTabWrapper should be used as a parent of LuxTab. Each LuxTab will register itself with the parent and show/hide its content based on the active tab index.

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

```jsx
<lux-tab-wrapper>
  <lux-tab title="Dog">Aspen is a cute dog!</lux-tab>
  <lux-tab title="Tree">Aspen is a majestic tree!</lux-tab>
</lux-tab-wrapper>
```

## LuxUniversityFooter

> UniversityFooter includes footer elements required by the University. It may
> be used when the LibraryFooter is too heavy for or not fully relevant to the
> site in question.
> Don't forget to create a fallback for this component by providing the HTML
> rendering in _<noscript></noscript>_ tags.

### Props

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

## LuxUniversityFooterCreativeCommons

> UniversityFooter includes footer elements required by the University. It may
> be used when the LibraryFooter is too heavy for or not fully relevant to the
> site in question.

### Props

| Prop name | Description                                                          | Type   | Values | Default |
| --------- | -------------------------------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the container                         | string | -      | "div"   |
| maxWidth  | The maximum width of the wrapper. Default is set to 1440.            | number | -      | 1440    |
| theme     | Whether the header is dark, shade, or light. Default is set to dark. | string | -      | "dark"  |

---

```jsx
<div>
  <lux-university-footer-creative-commons theme="dark"></lux-university-footer-creative-commons>
</div>
```
