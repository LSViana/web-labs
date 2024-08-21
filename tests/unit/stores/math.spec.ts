import { describe, expect,test } from 'vitest'

import { MathStore } from '~/stores/math'

describe('Math Store', () => {
  const store = new MathStore()

  describe('add', () => {
    test('two positive numbers', () => expect(store.add(1, 1)).toBe(2))

    test('two negative numbers', () => expect(store.add(-1, -1)).toBe(-2))

    test('a positive and a negative number', () => expect(store.add(1, -1)).toBe(0))

    test('a number to zero', () => expect(store.add(1, 0)).toBe(1))

    test('zero to a number', () => expect(store.add(0, 1)).toBe(1))

    test('zero to zero', () => expect(store.add(0, 0)).toBe(0))
  })
})
