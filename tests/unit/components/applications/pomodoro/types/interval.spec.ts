import { describe, expect, test } from 'vitest'
import { Interval } from '~/components/applications/pomodoro/types/interval'

describe('Interval', () => {
  test('formats zero interval correctly', () => {
    // Arrange
    const interval = new Interval(0, 0)

    // Act
    const value = interval.toString()

    // Assert
    expect(value).toBe('00:00')
  })

  test('formats one-digit interval correctly', () => {
    // Arrange
    const interval = new Interval(4, 7)

    // Act
    const value = interval.toString()

    // Assert
    expect(value).toBe('04:07')
  })

  test('formats two-digit interval correctly', () => {
    // Arrange
    const interval = new Interval(24, 37)

    // Act
    const value = interval.toString()

    // Assert
    expect(value).toBe('24:37')
  })

  test('formats three-digit interval correctly', () => {
    // Arrange
    const interval = new Interval(289, 123)

    // Act
    const value = interval.toString()

    // Assert
    expect(value).toBe('289:123')
  })
})
