import { describe, expect, test } from 'vitest';

import { Interval } from '~~/layers/pomodoro/types/interval';

describe('Interval', () => {
  test('formats zero interval correctly', () => {
    // Arrange
    const interval = new Interval(0, 0, 0);

    // Act
    const value = interval.toString();

    // Assert
    expect(value).toBe('00:00');
  });

  test('formats one-digit interval correctly', () => {
    // Arrange
    const interval = new Interval(0, 4, 7);

    // Act
    const value = interval.toString();

    // Assert
    expect(value).toBe('04:07');
  });

  test('formats two-digit interval correctly', () => {
    // Arrange
    const interval = new Interval(0, 24, 37);

    // Act
    const value = interval.toString();

    // Assert
    expect(value).toBe('24:37');
  });

  test('formats three-digit interval correctly', () => {
    // Arrange
    const interval1 = new Interval(0, 289, 123);
    const interval2 = new Interval(121, 12, 61);

    // Act
    const value1 = interval1.toString();
    const value2 = interval2.toString();

    // Assert
    expect(value1).toBe('04:51:03');
    expect(value2).toBe('121:13:01');
  });

  test('formats mixed negative values correctly', () => {
    // Arrange
    const interval1 = new Interval(0, 10, -60);
    const interval2 = new Interval(1, 75, -65);

    // Act
    const value1 = interval1.toString();
    const value2 = interval2.toString();

    // Assert
    expect(value1).toBe('09:00');
    expect(value2).toBe('02:13:55');
  });

  test('formats all negative values correctly', () => {
    // Arrange
    const interval = new Interval(0, -10, -65);

    // Act
    const value = interval.toString();

    // Assert
    expect(value).toBe('11:05');
  });

  test('initializes correctly with negative values', () => {
    // Arrange
    const interval = new Interval(-2, -82, -65);

    // Act
    const {
      hours,
      minutes,
      seconds,
    } = interval;

    // Assert
    expect(hours).toBe(-3);
    expect(minutes).toBe(-23);
    expect(seconds).toBe(-5);
  });

  test('calculates interval from dates correctly', () => {
    // Arrange
    const startDate = new Date('2000-01-01 10:03:05');
    const endDate = new Date('2000-01-01 11:18:19');

    // Act
    const interval = Interval.fromDates(startDate, endDate);

    // Assert
    expect(interval.hours).toBe(1);
    expect(interval.minutes).toBe(15);
    expect(interval.seconds).toBe(14);
  });

  test('calculates interval from dates with 500+ milliseconds correctly', () => {
    // Arrange
    const startDate = new Date('2000-01-01 10:00:00.501');
    const endDate = new Date('2000-01-01 11:05:00');

    // Act
    const interval = Interval.fromDates(startDate, endDate);

    // Assert
    expect(interval.hours).toBe(1);
    expect(interval.minutes).toBe(4);
    expect(interval.seconds).toBe(59);
  });

  test('calculates interval from dates with 500 milliseconds correctly', () => {
    // Arrange
    const startDate = new Date('2000-01-01 10:00:00.500');
    const endDate = new Date('2000-01-01 12:05:00');

    // Act
    const interval = Interval.fromDates(startDate, endDate);

    // Assert
    expect(interval.hours).toBe(2);
    expect(interval.minutes).toBe(5);
    expect(interval.seconds).toBe(0);
  });

  test('calculates interval from dates with 500- milliseconds correctly', () => {
    // Arrange
    const startDate = new Date('2000-01-01 10:00:00.499');
    const endDate = new Date('2000-01-01 13:05:00');

    // Act
    const interval = Interval.fromDates(startDate, endDate);

    // Assert
    expect(interval.hours).toBe(3);
    expect(interval.minutes).toBe(5);
    expect(interval.seconds).toBe(0);
  });

  test('calculates interval from inverted dates correctly', () => {
    // Arrange
    const startDate = new Date('2000-01-02 10:05:05');
    const endDate = new Date('2000-01-01 10:03:50');

    // Act
    const interval = Interval.fromDates(startDate, endDate);

    // Assert
    expect(interval.hours).toBe(-24);
    expect(interval.minutes).toBe(-1);
    expect(interval.seconds).toBe(-15);
  });

  test('calculates interval from arbitrary dates correctly', () => {
    // Arrange
    const startDate = new Date('2024-08-13T01:00:11.317Z');
    const endDate = new Date('2024-08-13T02:02:16.973Z');

    // Act
    const interval = Interval.fromDates(startDate, endDate);

    // Assert
    expect(interval.hours).toBe(1);
    expect(interval.minutes).toBe(2);
    expect(interval.seconds).toBe(6);
  });
});
