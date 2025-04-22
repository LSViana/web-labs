import { describe, expect, test } from 'vitest';

import { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';
import { getPomodoroTypeColor } from '~~/layers/pomodoro/types/client/pomodoroTypeColor';

describe('getPomodoroTypeColor', () => {
  test('should return correct colors for work interval type', () => {
    // Act
    const result = getPomodoroTypeColor(PomodoroIntervalType.work);

    // Assert
    expect(result).toEqual({
      background: 'bg-primary-600',
      backgroundInteractive: 'bg-primary-600 text-primary-50 hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-300',
      borderHorizontal: 'border-primary-800',
      stroke: 'stroke-primary-600',
    });
  });

  test('should return correct colors for break interval type', () => {
    // Act
    const result = getPomodoroTypeColor(PomodoroIntervalType.break);

    // Assert
    expect(result).toEqual({
      background: 'bg-green-600',
      backgroundInteractive: 'bg-green-600 text-green-50 hover:bg-green-700 active:bg-green-800 focus:ring-green-300',
      borderHorizontal: 'border-green-800',
      stroke: 'stroke-green-600',
    });
  });

  test('should throw an error for an unsupported interval type', () => {
    // Arrange
    const invalidType = 'invalid' as PomodoroIntervalType;

    // Act & Assert
    expect(() => getPomodoroTypeColor(invalidType)).toThrowError(
      'Unable to calculate duration for invalid.',
    );
  });
});
