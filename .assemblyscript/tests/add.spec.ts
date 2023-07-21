import { describe, it, expect } from 'vitest'
import { add } from 'assemblyscript/build/debug'

describe('add', () => {
  it('should work with positive numbers', () => {
    expect(add(1, 2)).toBe(3)
  })

  it('should work with negative numbers', () => {
    expect(add(-4, -3)).toBe(-7)
  })

  it('should work with zeroes', () => {
    expect(add(0, 2)).toBe(2)
    expect(add(7, 0)).toBe(7)
    expect(add(0, 0)).toBe(0)
  })
})
