import _LuxCalendar from "@/components/_LuxCalendar.vue"
import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

describe("_LuxCalendar", () => {
  it("displays the calendar for the specified month", () => {
    const component = mount(_LuxCalendar, { props: { month: 3, year: 2026 } })
    const weeks = component
      .findAll("tr")
      .slice(1)
      .map(week => {
        return week.findAll("td").map(day => day.text())
      })
    expect(weeks).toEqual([
      ["", "", "", "1", "2", "3", "4"],
      ["5", "6", "7", "8", "9", "10", "11"],
      ["12", "13", "14", "15", "16", "17", "18"],
      ["19", "20", "21", "22", "23", "24", "25"],
      ["26", "27", "28", "29", "30", "", ""],
    ])
  })
  it("emits an event on click", () => {
    const component = mount(_LuxCalendar, { props: { month: 3, year: 2026 } })
    const april_8th = component.findAll("td").find(td => td.text() === "8")

    april_8th.trigger("click")

    expect(component.emitted().selected).toEqual([[new Date(2026, 3, 8)]])
  })
})
