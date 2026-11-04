import { dayName, firstDayOfWeek, lastDayOfWeek, weeks } from "@/utils/luxDate"
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
})
