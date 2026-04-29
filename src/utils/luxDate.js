// This file contains the Date logic for LuxDatePicker

export const SUNDAY = 0
export const MONDAY = 1
export const TUESDAY = 2
export const WEDNESDAY = 3
export const THURSDAY = 4
export const FRIDAY = 5
export const SATURDAY = 6

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

function week(year, monthIndex, weekIndex) {
  return integerRange(7).map(dayOfWeek => {
    const date = weekIndex * 7 + dayOfWeek - monthStartsOnDay(year, monthIndex) + 1
    return validDate(year, monthIndex, date) ? date : null
  })
}

function numberOfWeeksInMonth(year, monthIndex) {
  return Math.ceil((monthStartsOnDay(year, monthIndex) + lastDayOfMonth(year, monthIndex)) / 7)
}

function monthStartsOnDay(year, monthIndex) {
  return new Date(year, monthIndex, 1).getDay()
}

function lastDayOfMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate()
}

function integerRange(size) {
  return [...Array(size).keys()]
}

function validDate(year, monthIndex, date) {
  return date > 0 && date <= lastDayOfMonth(year, monthIndex)
}
