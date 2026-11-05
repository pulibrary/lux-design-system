// This file contains the Date logic for LuxDatePicker

export const SUNDAY = 0
export const MONDAY = 1
export const TUESDAY = 2
export const WEDNESDAY = 3
export const THURSDAY = 4
export const FRIDAY = 5
export const SATURDAY = 6

export const JANUARY = 0
export const FEBRUARY = 1
export const MARCH = 2
export const APRIL = 3
export const MAY = 4
export const JUNE = 5
export const JULY = 6
export const AUGUST = 7
export const SEPTEMBER = 8
export const OCTOBER = 9
export const NOVEMBER = 10
export const DECEMBER = 11

export const ONE_WEEK = 7

// This is a Sunday that we can use for localization
const PLACEHOLDER_SUNDAY = () => new Date(2026, 10, 1)
const PLACEHOLDER_YEAR = 2026

export function dayName(dayIndex, locale = "default") {
  const day = PLACEHOLDER_SUNDAY()
  day.setDate(day.getDate() + dayIndex)
  return day.toLocaleString(locale, { weekday: "short" })
}

/**
 *
 * @param integer monthIndex
 * @param Intl.LocalesArgument locale (optional)
 * @returns string
 */
export function monthName(monthIndex, locale = "default") {
  return new Date(PLACEHOLDER_YEAR, monthIndex, 1).toLocaleString(locale, { month: "long" })
}

export function toString(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

/**
 *
 * @param integer year
 * @param integer monthIndex
 * @returns an array of weeks in that month. Each week is an array of the
 * days within that week.
 *
 */
export function weeks(year, monthIndex) {
  return integerRange(numberOfWeeksInMonth(year, monthIndex)).map(weekIndex =>
    week(year, monthIndex, weekIndex)
  )
}

/**
 *
 * @param {Date} date
 * @returns another Date.  If the input date is Sunday, return the input.
 * If it is a different day of the week, return the previous Sunday.
 */
export function firstDayOfWeek(date) {
  const earlier = clone(date)
  earlier.setDate(earlier.getDate() - earlier.getDay())
  return earlier
}

/**
 *
 * @param {Date} date
 * @returns another Date.  If the input date is Saturday, return the input.
 * If it is a different day of the week, return the following Saturday.
 */
export function lastDayOfWeek(date) {
  const later = clone(date)
  later.setDate(later.getDate() + (SATURDAY - later.getDay()))
  return later
}

/**
 * @param {Date} date
 * @param {integer} number of days in future (positive) or past (negative) relative to the date provided
 * @returns another Date.
 */
function plusDays(date, days) {
  const newDate = clone(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

/**
 * The date that is one month after the provided date.
 *
 * @param {Date} date
 * @returns another Date.
 */
export function plusOneMonth(date) {
  return changeMonthWithRounding(date, 1)
}

/**
 * The date that is one month before the provided date.
 *
 * @param {Date} date
 * @returns another Date.
 */
export function minusOneMonth(date) {
  return changeMonthWithRounding(date, -1)
}

/**
 * Handle the typical keyboard interactions that a user might make with a calendar widget
 *
 * @param {Function} currentDate - a function to retrieve the current date
 * @param {Function} moveToDateBehavior - what should happen if the user moves to a different date without selecting it
 * @param {Function} selectDateBehavior - what should happen if the user selects the current date
 * @returns an event handler for Keydown behavior
 */
export function keyboardNav(currentDate, moveToDateBehavior, selectDateBehavior) {
  return event => {
    event.preventDefault()
    switch (event.key) {
      case "ArrowDown":
        moveToDateBehavior(plusDays(currentDate(), ONE_WEEK))
        break
      case "ArrowUp":
        moveToDateBehavior(plusDays(currentDate(), -ONE_WEEK))
        break
      case "ArrowRight":
        moveToDateBehavior(plusDays(currentDate(), 1))
        break
      case "ArrowLeft":
        moveToDateBehavior(plusDays(currentDate(), -1))
        break
      case "Enter":
      case " ":
        selectDateBehavior()
        break
      case "Home":
        moveToDateBehavior(firstDayOfWeek(currentDate()))
        selectDateBehavior()
        break
      case "End":
        moveToDateBehavior(lastDayOfWeek(currentDate()))
        selectDateBehavior()
        break
      case "PageDown":
        if (event.getModifierState("Shift")) {
          moveToDateBehavior(plusOneYear(currentDate()))
        } else {
          moveToDateBehavior(plusOneMonth(currentDate()))
        }
        selectDateBehavior()
        break
      case "PageUp":
        if (event.getModifierState("Shift")) {
          moveToDateBehavior(minusOneYear(currentDate()))
        } else {
          moveToDateBehavior(minusOneMonth(currentDate()))
        }
        selectDateBehavior()
        break
    }
  }
}

function week(year, monthIndex, weekIndex) {
  return integerRange(ONE_WEEK).map(dayOfWeek => {
    const date = weekIndex * ONE_WEEK + dayOfWeek - monthStartsOnDay(year, monthIndex) + 1
    return validDate(year, monthIndex, date) ? date : null
  })
}

function numberOfWeeksInMonth(year, monthIndex) {
  return Math.ceil(
    (monthStartsOnDay(year, monthIndex) + lastDayOfMonth(year, monthIndex)) / ONE_WEEK
  )
}

function monthStartsOnDay(year, monthIndex) {
  return new Date(year, monthIndex, 1).getDay()
}

export function lastDayOfMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate()
}

/**
 * The date that is 12 months after the provided date.
 *
 * @param {Date} date
 * @returns another Date.
 */
function plusOneYear(date) {
  return changeMonthWithRounding(date, 12)
}

/**
 * The date that is 12 months before the provided date.
 *
 * @param {Date} date
 * @returns another Date.
 */
function minusOneYear(date) {
  return changeMonthWithRounding(date, -12)
}

function integerRange(size) {
  return [...Array(size).keys()]
}

function validDate(year, monthIndex, date) {
  return date > 0 && date <= lastDayOfMonth(year, monthIndex)
}

function clone(date) {
  return new Date(date.getTime())
}

/**
 * Add or subtract the desired number of months to the provided date.  If the desired month does not
 * have as many days as the provided date's month, round down to the last day of the month
 *
 * @param {Date} date
 * @param {Integer} number of months (can be positive for a future month or negative for a past month)
 * @returns another Date.
 */
function changeMonthWithRounding(date, numberOfMonths) {
  const desiredMonth = date.getMonth() + numberOfMonths
  const lastDateInDesiredMonth = new Date(
    date.getFullYear(),
    desiredMonth,
    lastDayOfMonth(date.getFullYear(), desiredMonth)
  )
  const withoutRounding = clone(date)
  withoutRounding.setMonth(desiredMonth)
  return lastDateInDesiredMonth < withoutRounding ? lastDateInDesiredMonth : withoutRounding
}
