<template>
  <div class="date-entry ds_question">
    <label class="ds_label" for="first-payment-date"
      >When will your tenant make this first payment?</label
    >
    <div class="ds_hint-text">
      <p>Use DD/MM/YYYY format.</p>
    </div>

    <div id="basic" data-module="ds-datepicker" class="ds_datepicker">
      <div class="ds_input__wrapper">
        <input class="ds_input ds_input--fixed-10" type="text" placeholder="e.g. 01/12/2020" />
      </div>
    </div>
  </div>

  <div class="date-entry ds_question">
    <label class="ds_label" for="first-payment-date"
      >When will your tenant make this first payment?</label
    >
    <div class="ds_hint-text">
      <p>Use DD/MM/YYYY format.</p>
    </div>

    <div id="minmaxdate" data-module="ds-datepicker" class="ds_datepicker">
      <div class="ds_input__wrapper">
        <input
          data-mindate="06/01/2020"
          data-maxdate="06/01/2021"
          class="ds_input ds_input--fixed-10"
          type="text"
          placeholder="e.g. 01/12/2020"
        />
      </div>
    </div>
  </div>

  <div class="date-entry ds_question">
    <label class="ds_label" for="first-payment-date"
      >When will your tenant make this first payment?</label
    >
    <div class="ds_hint-text">
      <p>Use DD/MM/YYYY format.</p>
    </div>

    <div id="mindateoutofbounds" data-module="ds-datepicker" class="ds_datepicker">
      <div class="ds_input__wrapper">
        <input
          data-mindate="06/01/2120"
          class="ds_input ds_input--fixed-10"
          type="text"
          placeholder="e.g. 01/12/2020"
        />
      </div>
    </div>
  </div>

  <div class="date-entry ds_question">
    <label class="ds_label" for="first-payment-date"
      >When will your tenant make this first payment?</label
    >
    <div class="ds_hint-text">
      <p>Use DD/MM/YYYY format.</p>
    </div>

    <div id="maxdateoutofbounds" data-module="ds-datepicker" class="ds_datepicker">
      <div class="ds_input__wrapper">
        <input
          data-maxdate="06/01/1920"
          class="ds_input ds_input--fixed-10"
          type="text"
          placeholder="e.g. 01/12/2020"
        />
      </div>
    </div>
  </div>

  <div class="date-entry ds_question">
    <label class="ds_label" for="first-payment-date"
      >When will your tenant make this first payment?</label
    >
    <div class="ds_hint-text">
      <p>Use DD/MM/YYYY format.</p>
    </div>

    <div id="noinput" data-module="ds-datepicker" class="ds_datepicker"></div>
  </div>

  <div class="date-entry ds_question">
    <label class="ds_label" for="first-payment-date"
      >When will your tenant make this first payment?</label
    >
    <div class="ds_hint-text">
      <p>Use DD/MM/YYYY format.</p>
    </div>

    <div id="multiple" data-module="ds-datepicker" class="ds_datepicker ds_datepicker--multiple">
      <div class="ds_datepicker__input-wrapper">
        <div>
          <label class="ds_label" for="day">Day</label>
          <input id="day" class="ds_input ds_input--fixed-2 js-datepicker-date" />
        </div>

        <div>
          <label class="ds_label" for="month">Month</label>
          <input id="month" class="ds_input ds_input--fixed-2 js-datepicker-month" />
        </div>

        <div>
          <label class="ds_label" for="year">Year</label>
          <input id="year" class="ds_input ds_input--fixed-4 js-datepicker-year" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$date-picker-focus-outline-width: 0.125em;
$date-picker-focus-border-width: var(--space-xx-small);

.ds_datepicker {
  position: relative;
  //   @include ds_responsive-margin(3, bottom);

  .ds_input {
    margin-bottom: 0;
  }

  &__input-wrapper {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  &__dialog {
    // @include ds_box-shadow;

    background-color: var(--color-white);
    clear: both;
    display: none;
    padding: 8px;
    outline: 1px solid var(--color-princeton-orange-on-white);
    outline-offset: -1px;
    position: static;
    top: 0;
    transition: background-color 0.2s, outline-color 0.2s;
    width: 296px;
    z-index: 2;

    &--open {
      display: block;

      @supports (left: var(--ds-date-picker-left-offset)) {
        left: var(--ds-date-picker-left-offset);
      }
    }

    &__header {
      position: relative;
      text-align: center;

      > :nth-child(1) {
        position: absolute;
        left: 0;
        top: -2px;
      }

      > :nth-child(3) {
        position: absolute;
        right: 0;
        top: -2px;
      }
    }

    &__title {
      //   @include ds_small-size;
      line-height: line-height-on-grid(var(--line-height-small), 2);
      margin: 0 !important;
      text-transform: uppercase;
    }

    &__navbuttons {
      button {
        // @include ds_link;
        // @include ds_link--block;

        background-color: transparent;
        color: var(--color-rich-black);
        display: inline-block;
        font-weight: var(--font-weight-regular);
        min-height: 40px;
        margin: 0;
        padding: 4px;
        min-width: 32px;

        &:hover {
          color: currentColor;
        }

        .ds_icon {
          height: 32px;
          padding: 0;
          position: static;
          width: 24px;
        }
      }
    }

    &__table {
      tbody:focus-within {
        outline: $date-picker-focus-outline-width solid var(--color-princeton-orange-on-white);

        // @include ds_media-query-high-contrast {
        //   outline-color: highlight;
        // }
      }

      td {
        border: 0;
        margin: 0;
        outline: 0;
        padding: 0;
      }

      th {
        // @include ds_small-size;
        color: var(--color-rich-black) --secondary;
        font-weight: var(--font-weight-regular);
      }

      button {
        // @include ds_small-size;
        // @include ds_link;
        // @include ds_link--block;

        background-color: transparent;
        border-width: 0;
        color: var(--color-rich-black);
        font-weight: var(--font-weight-regular);
        min-height: 40px;
        margin: 0;
        padding: 0;
        min-width: 40px;

        &[disabled="true"],
        &[aria-disabled="true"] {
          background-color: var(--color-grayscale-light);
          color: var(--color-grayscale-lighter);
          pointer-events: none;

          &:focus {
            box-shadow: inset 0 #{$date-picker-focus-border-width * -1} $ds_colour__focus,
              // bottom shadow
              inset 0 $date-picker-focus-outline-width $ds_colour__focus--background,
              // top
              inset #{$date-picker-focus-outline-width * -1} 0 $ds_colour__focus--background,
              // right
              inset 0 #{($date-picker-focus-outline-width + $date-picker-focus-border-width) * -1}
                $ds_colour__focus--background,
              // bottom
              inset $date-picker-focus-outline-width 0 $ds_colour__focus--background; // left
          }
        }

        &.ds_datepicker__current {
          $dp-current-outline-width: 2px;
          outline: $dp-current-outline-width solid $ds_colour__border--strong !important;
          outline-offset: #{$dp-current-outline-width * -1};
        }

        &.ds_datepicker__current[tabindex="-1"] {
          background: $ds_colour__link--current__background;
          color: currentColor;
        }

        &.ds_datepicker__today {
          font-weight: $bold;

          &::after {
            background-color: currentColor;
            border-radius: 4px;
            bottom: 6px;
            content: "";
            height: 4px;
            left: 50%;
            margin-left: -2px;
            position: absolute;
            width: 4px;
          }
        }

        &.ds_selected:not(:focus) {
          background-color: var(--color-rich-black);
          color: var(--color-rich-black) --reversed;
        }

        /*
                 * helps with focus in windows high contrast
                 */
        &:focus {
          color: $ds_colour__focus;
          position: relative;
          z-index: 2; // [1]
        }
      }
    }

    &__table-caption {
      //   @include ds_tiny-size;
      caption-side: bottom;
      line-height: 2;
      margin-top: 8px;
    }

    &__buttongroup {
      //   @include ds_layout(8px);
      overflow: visible;

      // non-grid
      button {
        // @include ds_colwidth(1, 2, 8px);
        display: block;
        float: left;
        margin: 0;
      }

      @supports (display: grid) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  &__button {
    // @include ds_small-size;
    // @include ds_button-sizing--small;

    align-self: end;
  }
}

@include ds_media-query(medium) {
  .ds_datepicker {
    &__dialog {
      position: absolute;

      &__title {
        line-height: line-height-on-grid($small-size--medium, 1.5);
        padding: 8px 0;
      }

      &__header {
        > :nth-child(1) {
          // left: 8px;
          top: 0;
        }

        > :nth-child(3) {
          // right: 8px;
          top: 0;
        }
      }

      &__table th {
        line-height: line-height-on-grid($small-size--medium, 2);
      }

      &__table-caption {
        line-height: line-height-on-grid($tiny-size--medium, 2);
      }
    }
  }
}
</style>
