import {
  dayName,
  firstDayOfWeek,
  lastDayOfWeek,
  weeks,
  plusOneMonth,
  JANUARY,
  DECEMBER,
  MARCH,
  APRIL,
  FEBRUARY,
  keyboardNav,
} from "@/utils/luxDate"
import { describe, it, expect } from "vitest"

describe("dayName()", () => {
  it("gives the day of the week", () => {
    expect(dayName(0, "en-US")).toEqual("Sun")
    expect(dayName(0, "cs-CZ")).toEqual("ne")
    expect(dayName(0, "ar-JO")).toEqual("الأحد")
  })
})

describe("weeks()", () => {
  it("works for a month that starts on Wednesday (April 2026)", () => {
    expect(weeks(2026, 3)).toEqual([
      [null, null, null, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, null, null],
    ])
  })
  it("works for a month that starts on Sunday (May 2050)", () => {
    expect(weeks(2050, 4)).toEqual([
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, null, null, null, null],
    ])
  })
  it("works for a month that starts on Friday (April 2050)", () => {
    expect(weeks(2050, 3)).toEqual([
      [null, null, null, null, null, 1, 2],
      [3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29, 30],
    ])
  })
  describe("firstDayOfWeek()", () => {
    it("gives the first day (Sunday) in a given week", () => {
      const original = new Date(1990, 2, 15) // Thursday, March 15, 1990
      const expected = new Date(1990, 2, 11)
      expect(firstDayOfWeek(original)).toEqual(expected)
    })
  })
  describe("lastDayOfWeek()", () => {
    it("gives the last day (Saturday) in a given week", () => {
      const original = new Date(1990, 2, 15) // Thursday, March 15, 1990
      const expected = new Date(1990, 2, 17)
      expect(lastDayOfWeek(original)).toEqual(expected)
    })
  })
  describe("plusOneMonth()", () => {
    it("gives the date that is a month from the provided date", () => {
      const original = new Date(1990, MARCH, 15)
      const expected = new Date(1990, APRIL, 15)
      expect(plusOneMonth(original)).toEqual(expected)
    })
    it("chooses the last day of the month if the following month does not have the requested date", () => {
      const original = new Date(1990, JANUARY, 31)
      const expected = new Date(1990, FEBRUARY, 28)
      expect(plusOneMonth(original)).toEqual(expected)
    })
    it("works for leap years", () => {
      const original = new Date(2024, JANUARY, 31)
      const expected = new Date(2024, FEBRUARY, 29)
      expect(plusOneMonth(original)).toEqual(expected)
    })
    it("works at the end of the year", () => {
      const original = new Date(2024, DECEMBER, 15)
      const expected = new Date(2025, JANUARY, 15)
      expect(plusOneMonth(original)).toEqual(expected)
    })
  })

  describe("keyboardNav", () => {
    function testKey(event, currentDate = new Date(2000, JANUARY, 1)) {
      let selected = false
      keyboardNav(
        () => currentDate,
        newDate => (currentDate = newDate),
        () => (selected = true)
      )(event)
      return { currentDate, selected }
    }
    it("selects on space", () => {
      let event = new KeyboardEvent("keydown", { key: " " })
      const { selected } = testKey(event)
      expect(selected).toEqual(true)
    })
    it("selects on enter", () => {
      let event = new KeyboardEvent("keydown", { key: "Enter" })
      const { selected } = testKey(event)
      expect(selected).toEqual(true)
    })
    it("selects a year in advance on Shift+PageDown", () => {
      let event = new KeyboardEvent("keydown", { key: "PageDown", shiftKey: true })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(2001, JANUARY, 1))
      expect(selected).toEqual(true)
    })
    it("selects a month in advance on PageDown", () => {
      let event = new KeyboardEvent("keydown", { key: "PageDown", shiftKey: false })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(2000, FEBRUARY, 1))
      expect(selected).toEqual(true)
    })
    it("selects the following Saturday", () => {
      let event = new KeyboardEvent("keydown", { key: "End" })
      const { currentDate, selected } = testKey(event, new Date(2222, JANUARY, 1))
      expect(currentDate).toEqual(new Date(2222, JANUARY, 5))
      expect(selected).toEqual(true)
    })
    it("does not move on End if current day is a Saturday", () => {
      let event = new KeyboardEvent("keydown", { key: "End" })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(2000, JANUARY, 1))
      expect(selected).toEqual(true)
    })
    it("moves a week in advance on ArrowDown without selecting", () => {
      let event = new KeyboardEvent("keydown", { key: "ArrowDown" })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(2000, JANUARY, 8))
      expect(selected).toEqual(false)
    })
    it("moves a day in advance on ArrowRight without selecting", () => {
      let event = new KeyboardEvent("keydown", { key: "ArrowRight" })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(2000, JANUARY, 2))
      expect(selected).toEqual(false)
    })
    it("selects a year in the past on Shift+PageUp", () => {
      let event = new KeyboardEvent("keydown", { key: "PageUp", shiftKey: true })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(1999, JANUARY, 1))
      expect(selected).toEqual(true)
    })
    it("selects a month in the past on PageUp", () => {
      let event = new KeyboardEvent("keydown", { key: "PageUp", shiftKey: false })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(1999, DECEMBER, 1))
      expect(selected).toEqual(true)
    })
    it("selects the previous Sunday on Home", () => {
      let event = new KeyboardEvent("keydown", { key: "Home" })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(1999, DECEMBER, 26))
      expect(selected).toEqual(true)
    })
    it("moves a week in the past on ArrowUp without selecting", () => {
      let event = new KeyboardEvent("keydown", { key: "ArrowUp" })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(1999, DECEMBER, 25))
      expect(selected).toEqual(false)
    })
    it("moves a day in the past on ArrowLeft without selecting", () => {
      let event = new KeyboardEvent("keydown", { key: "ArrowLeft" })
      const { currentDate, selected } = testKey(event)
      expect(currentDate).toEqual(new Date(1999, DECEMBER, 31))
      expect(selected).toEqual(false)
    })
  })
})
