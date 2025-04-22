import { describe, expect, test } from 'vitest';

import { Interval } from '~~/layers/pomodoro/types/client/interval';
import { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';
import { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';

describe('PomodoroRecord', () => {
  test('initializes correctly with valid data', () => {
    // Arrange
    const id = 1;
    const startDate = new Date('2023-01-01T10:00:00');
    const endDate = new Date('2023-01-01T10:25:00');
    const type = PomodoroIntervalType.work;

    // Act
    const record = new PomodoroRecord(id, startDate, endDate, type);

    // Assert
    expect(record.id).toBe(id);
    expect(record.startTime).toEqual(startDate);
    expect(record.endTime).toEqual(endDate);
    expect(record.type).toBe(type);
  });

  test('calculates elapsedInterval correctly', () => {
    // Arrange
    const startDate = new Date('2023-01-01T10:00:00');
    const endDate = new Date('2023-01-01T10:25:00');
    const record = new PomodoroRecord(1, startDate, endDate, PomodoroIntervalType.work);

    // Act
    const elapsedInterval = record.elapsedInterval;

    // Assert
    expect(elapsedInterval).toBeInstanceOf(Interval);
    expect(elapsedInterval.hours).toBe(0);
    expect(elapsedInterval.minutes).toBe(25);
    expect(elapsedInterval.seconds).toBe(0);
  });

  test('handles inverted dates correctly', () => {
    // Arrange
    const startDate = new Date('2023-01-01T11:00:00');
    const endDate = new Date('2023-01-01T10:00:00');
    const record = new PomodoroRecord(1, startDate, endDate, PomodoroIntervalType.work);

    // Act
    const elapsedInterval = record.elapsedInterval;

    // Assert
    expect(elapsedInterval.hours).toBe(-1);
    expect(elapsedInterval.minutes).toBe(-0);
    expect(elapsedInterval.seconds).toBe(-0);
  });

  test('handles milliseconds correctly in elapsedInterval', () => {
    // Arrange
    const startDate = new Date('2023-01-01T10:00:00.500');
    const endDate = new Date('2023-01-01T10:25:00.999');
    const record = new PomodoroRecord(1, startDate, endDate, PomodoroIntervalType.work);

    // Act
    const elapsedInterval = record.elapsedInterval;

    // Assert
    expect(elapsedInterval.hours).toBe(0);
    expect(elapsedInterval.minutes).toBe(25);
    expect(elapsedInterval.seconds).toBe(0);
  });

  test('handles zero interval correctly', () => {
    // Arrange
    const startDate = new Date('2023-01-01T10:00:00');
    const endDate = new Date('2023-01-01T10:00:00');
    const record = new PomodoroRecord(1, startDate, endDate, PomodoroIntervalType.break);

    // Act
    const elapsedInterval = record.elapsedInterval;

    // Assert
    expect(elapsedInterval.hours).toBe(0);
    expect(elapsedInterval.minutes).toBe(0);
    expect(elapsedInterval.seconds).toBe(0);
  });

  test('handles negative intervals correctly', () => {
    // Arrange
    const startDate = new Date('2023-01-01T10:00:00');
    const endDate = new Date('2023-01-01T09:30:00');
    const record = new PomodoroRecord(1, startDate, endDate, PomodoroIntervalType.work);

    // Act
    const elapsedInterval = record.elapsedInterval;

    // Assert
    expect(elapsedInterval.hours).toBe(-0);
    expect(elapsedInterval.minutes).toBe(-30);
    expect(elapsedInterval.seconds).toBe(-0);
  });
});
