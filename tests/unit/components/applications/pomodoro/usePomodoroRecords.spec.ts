import { toRaw } from '@vue/reactivity'
import { describe, expect, test } from 'vitest'

import { PomodoroRecord } from '~/components/applications/pomodoro/types/pomodoroRecord'
import { PomodoroIntervalType } from '~/components/applications/pomodoro/types/pomodoroType'
import { usePomodoroRecords } from '~/components/applications/pomodoro/usePomodoroRecords'

describe('usePomodoroRecords', () => {
  test('adds a record to the empty list', () => {
    // Arrange
    const records = usePomodoroRecords()

    // Assert
    expect(records.value).toHaveLength(0)

    // Act
    const record = new PomodoroRecord(new Date(), new Date(), PomodoroIntervalType.work)
    records.add(record)

    // Assert
    expect(records.value).toHaveLength(1)
    expect(toRaw(records.value[0])).toBe(record)
  })

  test('adds a record to the filled list', () => {
    // Arrange
    const records = usePomodoroRecords()
    records.add(new PomodoroRecord(
      new Date('2022-01-01T00:10:00.000Z'),
      new Date('2022-01-01T00:20:00.000Z'),
      PomodoroIntervalType.work
    ))
    records.add(new PomodoroRecord(
      new Date('2022-01-01T00:30:00.000Z'),
      new Date('2022-01-01T00:40:00.000Z'),
      PomodoroIntervalType.work
    ))

    // Act (adds to the beginning of the list)
    let record = new PomodoroRecord(
      new Date('2022-01-01T00:05:00.000Z'),
      new Date('2022-01-01T00:10:00.000Z'),
      PomodoroIntervalType.work
    )
    records.add(record)

    // Assert
    expect(records.value).toHaveLength(3)
    expect(toRaw(records.value[0])).toBe(record)

    // Act (adds to the middle of the list)
    record = new PomodoroRecord(
      new Date('2022-01-01T00:20:00.000Z'),
      new Date('2022-01-01T00:25:00.000Z'),
      PomodoroIntervalType.work
    )
    records.add(record)

    // Assert
    expect(records.value).toHaveLength(4)
    expect(toRaw(records.value[2])).toBe(record)

    // Act (adds to the end of the list)
    record = new PomodoroRecord(
      new Date('2022-01-01T00:45:00.000Z'),
      new Date('2022-01-01T00:50:00.000Z'),
      PomodoroIntervalType.work
    )
    records.add(record)

    // Assert
    expect(records.value).toHaveLength(5)
    expect(toRaw(records.value[4])).toBe(record)
  })

  test('updates a record', () => {
    // Arrange
    const records = usePomodoroRecords()
    records.add(new PomodoroRecord(
      new Date('2022-01-01T00:10:00.000Z'),
      new Date('2022-01-01T00:20:00.000Z'),
      PomodoroIntervalType.work
    ))
    records.add(new PomodoroRecord(
      new Date('2022-01-01T00:20:00.000Z'),
      new Date('2022-01-01T00:30:00.000Z'),
      PomodoroIntervalType.work
    ))
    records.add(new PomodoroRecord(
      new Date('2022-01-01T00:30:00.000Z'),
      new Date('2022-01-01T00:40:00.000Z'),
      PomodoroIntervalType.work
    ))

    // Act (updates the first record)
    let record = new PomodoroRecord(
      new Date('2022-01-01T00:12:00.000Z'),
      new Date('2022-01-01T00:20:00.000Z'),
      PomodoroIntervalType.work
    )
    records.update(record, 0)

    // Assert
    expect(records.value).toHaveLength(3)
    expect(toRaw(records.value[0])).toBe(record)

    // Act (updates the middle record)
    record = new PomodoroRecord(
      new Date('2022-01-01T00:22:00.000Z'),
      new Date('2022-01-01T00:30:00.000Z'),
      PomodoroIntervalType.work
    )
    records.update(record, 1)

    // Assert
    expect(records.value).toHaveLength(3)
    expect(toRaw(records.value[1])).toBe(record)

    // Act (updates the last record)
    record = new PomodoroRecord(
      new Date('2022-01-01T00:30:00.000Z'),
      new Date('2022-01-01T00:35:00.000Z'),
      PomodoroIntervalType.work
    )
    records.update(record, 2)

    // Assert
    expect(records.value).toHaveLength(3)
    expect(toRaw(records.value[2])).toBe(record)

    // Act (updates the middle record and move it to the beginning)
    record = new PomodoroRecord(
      new Date('2022-01-01T00:10:00.000Z'),
      new Date('2022-01-01T00:12:00.000Z'),
      PomodoroIntervalType.work
    )
    records.update(record, 2)

    // Assert
    expect(records.value).toHaveLength(3)
    expect(toRaw(records.value[0])).toBe(record)

    // Act (updates the first record and move it to the end)
    record = new PomodoroRecord(
      new Date('2022-01-01T00:35:00.000Z'),
      new Date('2022-01-01T00:40:00.000Z'),
      PomodoroIntervalType.work
    )
    records.update(record, 0)

    // Assert
    expect(records.value).toHaveLength(3)
    expect(toRaw(records.value[2])).toBe(record)
  })

  test('removes a record', () => {
    // Arrange
    const records = usePomodoroRecords()
    records.add(new PomodoroRecord(
      new Date('2022-01-01T00:10:00.000Z'),
      new Date('2022-01-01T00:20:00.000Z'),
      PomodoroIntervalType.work
    ))
    records.add(new PomodoroRecord(
      new Date('2022-01-01T00:20:00.000Z'),
      new Date('2022-01-01T00:30:00.000Z'),
      PomodoroIntervalType.work
    ))
    records.add(new PomodoroRecord(
      new Date('2022-01-01T00:30:00.000Z'),
      new Date('2022-01-01T00:40:00.000Z'),
      PomodoroIntervalType.work
    ))

    // Assert
    expect(records.value).toHaveLength(3)

    // Act (removes the middle record)
    records.remove(1)

    // Assert
    expect(records.value).toHaveLength(2)

    // Act (removes the last record)
    records.remove(1)

    // Assert
    expect(records.value).toHaveLength(1)

    // Act (removes the first record)
    records.remove(0)

    // Assert
    expect(records.value).toHaveLength(0)
  })

  test('loads a list of records', () => {
    // Arrange
    const records = usePomodoroRecords()

    // Act
    const pomodoroRecords = [
      new PomodoroRecord(
        new Date('2022-01-01T00:10:00.000Z'),
        new Date('2022-01-01T00:20:00.000Z'),
        PomodoroIntervalType.work
      ),
      new PomodoroRecord(
        new Date('2022-01-01T00:20:00.000Z'),
        new Date('2022-01-01T00:30:00.000Z'),
        PomodoroIntervalType.work
      ),
      new PomodoroRecord(
        new Date('2022-01-01T00:30:00.000Z'),
        new Date('2022-01-01T00:40:00.000Z'),
        PomodoroIntervalType.work
      )
    ]
    records.load(pomodoroRecords)

    // Assert
    expect(records.value).toHaveLength(3)
    expect(toRaw(records.value[0])).toBe(pomodoroRecords[0])
    expect(toRaw(records.value[1])).toBe(pomodoroRecords[1])
    expect(toRaw(records.value[2])).toBe(pomodoroRecords[2])
  })
})
