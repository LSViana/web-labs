import { describe, expect, it } from 'vitest'
import { appendName } from 'assemblyscript/build/debug'

describe('appendName', () => {
  it('should append ", Lucas" to the provided string', () => {
    expect(appendName('Hello')).toBe('Hello, Lucas')
  })
})
