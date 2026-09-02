# LuxShowMore

> LuxShowMore is used for long texts that are useful for some users, but
> disruptive for others. For example, some users find it helpful to have
> lengthy journal article abstracts available on a search results page,
> while for others the abstracts are unhelpful and cause substantial
> unnecessary scrolling.

## Props

| Prop name      | Description                                                                                                                                                                                           | Type   | Values | Default |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------- |
| showLabel      | A description of the action of showing the full content.                                                                                                                                              | string | -      |         |
| hideLabel      | A description of the action of hiding the full content.                                                                                                                                               | string | -      |         |
| contentId      | Used for setting focus and aria-controls. It must be unique in your page.                                                                                                                             | string | -      |         |
| descriptionId  | The ID of an element in the DOM that provides further description of the full content.<br/><br/>Use this prop if you have multiple disclosures in your page with the same `showLabel` or `hideLabel`. | string | -      |         |
| characterLimit | How many characters to allow                                                                                                                                                                          | number | -      |         |

## Slots

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
