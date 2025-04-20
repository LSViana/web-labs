import { describe, expect, test } from 'vitest';

import { usePomodoroToday } from '~~/layers/pomodoro/composables/usePomodoroToday';

describe('usePomodoroToday', () => {
  test('get() should return today with time set to 00:00:00', () => {
    // Arrange
    const { get } = usePomodoroToday();
    const now = new Date();
    const expectedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Act
    const result = get();

    // Assert
    expect(result).toEqual(expectedDate);
  });

  test('isToday() should return true for today', () => {
    // Arrange
    const { isToday } = usePomodoroToday();
    const today = new Date();

    // Act
    const result = isToday(today);

    // Assert
    expect(result).toBe(true);
  });

  test('isToday() should return false for a date that is not today', () => {
    // Arrange
    const { isToday } = usePomodoroToday();
    const notToday = new Date();
    notToday.setDate(notToday.getDate() - 1); // Set to yesterday

    // Act
    const result = isToday(notToday);

    // Assert
    expect(result).toBe(false);
  });

  test('isSameDay() should return true for two dates on the same day', () => {
    // Arrange
    const { isSameDay } = usePomodoroToday();
    const date1 = new Date(2023, 0, 1, 0, 0, 0);
    const date2 = new Date(2023, 0, 1, 23, 59, 59, 999);

    // Act
    const result = isSameDay(date1, date2);

    // Assert
    expect(result).toBe(true);
  });

  test('isSameDay() should return false for two dates on different days', () => {
    // Arrange
    const { isSameDay } = usePomodoroToday();
    const date1 = new Date(2023, 0, 1, 23, 59, 59, 999);
    const date2 = new Date(2023, 0, 2, 0, 0, 0, 0);

    // Act
    const result = isSameDay(date1, date2);

    // Assert
    expect(result).toBe(false);
  });
});
