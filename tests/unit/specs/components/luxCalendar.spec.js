import _LuxCalendar from "@/components/_LuxCalendar.vue"
import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import { nextTick } from "vue"

function findDay(component, day) {
  return component.findAll("td").find(td => td.text() === String(day))
}

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
    const april_8th = findDay(component, 8)

    april_8th.trigger("click")

    expect(component.emitted().selected).toEqual([[new Date(2026, 3, 8)]])
  })
  it("highlights today's date", () => {
    const todayAsDate = new Date()
    const component = mount(_LuxCalendar, {
      props: { month: todayAsDate.getMonth(), year: todayAsDate.getFullYear() },
    })
    const today = findDay(component, todayAsDate.getDate())
    expect(today.classes()).toContain("lux-highlight-today")
  })
  it("implements v-model", async () => {
    const component = mount(_LuxCalendar, {
      props: {
        month: 0,
        year: 1,
        modelValue: 1,
        "onUpdate:modelValue": e => component.setProps({ modelValue: e }),
      },
    })
    const newYearsDay = findDay(component, 1)
    expect(newYearsDay.classes()).toContain("lux-highlight-selected")

    const january_5th = findDay(component, 5)
    january_5th.trigger("click")

    await nextTick()

    expect(component.props("modelValue")).toEqual(5)
  })
})
