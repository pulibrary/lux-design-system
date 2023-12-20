export const counterState = {
  count: 10,
}

export const counterMutations = {
  increment(state) {
    // `state` is the local module state
    state.count++
  },
}

export const counterGetters = {
  count: state => {
    return state.count
  },
}
