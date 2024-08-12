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
    expect(value).toBe('291:03')
  })

  test('formats mixed negative values correctly', () => {
    // Arrange
    const interval = new Interval(10, -60)

    // Act
    const value = interval.toString()

    // Assert
    expect(value).toBe('09:00')
  })

  test('formats all negative values correctly', () => {
    // Arrange
    const interval = new Interval(-10, -65)

    // Act
    const value = interval.toString()

    // Assert
    expect(value).toBe('11:05')
  })

  test('initializes correctly with negative values', () => {
    // Arrange
    const interval = new Interval(-10, -65)

    // Act
    const {
      minutes,
      seconds
    } = interval

    // Assert
    expect(minutes).toBe(-11)
    expect(seconds).toBe(-5)
  })

  test('calculates interval from dates correctly', () => {
    // Arrange
    const startDate = new Date('2000-01-01 10:03:05')
    const endDate = new Date('2000-01-01 11:18:19')

    // Act
    const interval = Interval.fromDates(startDate, endDate)

    // Assert
    expect(interval.minutes).toBe(75)
    expect(interval.seconds).toBe(14)
  })

  test('calculates interval from dates with 500+ milliseconds correctly', () => {
    // Arrange
    const startDate = new Date('2000-01-01 10:00:00.700')
    const endDate = new Date('2000-01-01 10:05:00')

    // Act
    const interval = Interval.fromDates(startDate, endDate)

    // Assert
    expect(interval.minutes).toBe(5)
    expect(interval.seconds).toBe(0)
  })

  test('calculates interval from dates with 500- milliseconds correctly', () => {
    // Arrange
    const startDate = new Date('2000-01-01 10:00:00.499')
    const endDate = new Date('2000-01-01 10:05:00')

    // Act
    const interval = Interval.fromDates(startDate, endDate)

    // Assert
    expect(interval.minutes).toBe(5)
    expect(interval.seconds).toBe(0)
  })

  test('calculates interval from inverted dates correctly', () => {
    // Arrange
    const startDate = new Date('2000-01-01 10:05:05')
    const endDate = new Date('2000-01-01 10:03:50')

    // Act
    const interval = Interval.fromDates(startDate, endDate)

    // Assert
    expect(interval.minutes).toBe(-1)
    expect(interval.seconds).toBe(-15)
  })
})
