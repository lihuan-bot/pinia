import { defineStore, expectType } from './'

const useStore = defineStore({
  id: 'name',
  state: () => ({ a: 'on' as 'on' | 'off', nested: { counter: 0 } }),
  getters: {
    upper() {
      expectType<'on' | 'off'>(this.a)
      return this.a.toUpperCase()
    },
    other() {
      expectType<string>(this.upper)
      return false
    },
  },
  actions: {
    doStuff() {
      expectType<string>(this.upper)
      expectType<false>(this.other)
    },
    otherOne() {
      expectType<() => void>(this.doStuff)
    },
  },
})

let store = useStore()

expectType<{ a: 'on' | 'off' }>(store.$state)
expectType<number>(store.nested.counter)
expectType<'on' | 'off'>(store.a)

// @ts-expect-error
store.nonExistant

// @ts-expect-error
store.nonExistant.stuff

// @ts-expect-error cannot return a value
store.$patch(async () => {})
store.$patch(() => {})
store.$patch(() => {
  // return earlier
  return
})
