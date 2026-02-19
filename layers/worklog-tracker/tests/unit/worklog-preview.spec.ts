import { describe, expect, it } from 'vitest';
import { computed, ref } from 'vue';

import { WorklogItem } from '~~/layers/worklog-tracker/types/client/worklogItem';

describe('Worklog Preview Total Time Calculation', () => {
  it('calculates preview total for new worklog correctly', () => {
    // Arrange
    const existingItems = [
      new WorklogItem('1', 'DEV-100', 'Work 1', new Date('2026-02-19T09:00:00'), new Date('2026-02-19T10:30:00')),
      new WorklogItem('2', 'DEV-101', 'Work 2', new Date('2026-02-19T08:00:00'), new Date('2026-02-19T09:00:00')),
    ];

    const startTime = ref(new Date('2026-02-19T10:30:00'));
    const endTime = ref(new Date('2026-02-19T12:00:00'));
    const worklogDurationSeconds = computed(() => WorklogItem.calculateDuration(startTime.value, endTime.value));
    const isEdit = ref(false);
    const currentItemId = ref(undefined);

    // Act
    const previewTotalSeconds = computed(() => {
      let total = 0;

      for (const existingItem of existingItems) {
        if (isEdit.value && existingItem.id === currentItemId.value) {
          continue;
        }
        total += existingItem.durationSeconds;
      }

      total += worklogDurationSeconds.value;

      return total;
    });

    // Assert
    // Existing: 1h 30m (5400s) + 1h 0m (3600s) = 2h 30m (9000s)
    // New: 1h 30m (5400s)
    // Total: 4h 0m (14400s)
    expect(previewTotalSeconds.value).toBe(14400);
  });

  it('calculates preview total for edited worklog correctly', () => {
    // Arrange
    const existingItems = [
      new WorklogItem('1', 'DEV-100', 'Work 1', new Date('2026-02-19T09:00:00'), new Date('2026-02-19T10:30:00')),
      new WorklogItem('2', 'DEV-101', 'Work 2', new Date('2026-02-19T08:00:00'), new Date('2026-02-19T09:00:00')),
      new WorklogItem('3', 'DEV-102', 'Work 3', new Date('2026-02-19T14:00:00'), new Date('2026-02-19T14:45:00')),
    ];

    const startTime = ref(new Date('2026-02-19T14:00:00'));
    const endTime = ref(new Date('2026-02-19T16:00:00')); // Editing item 3 to be 2h instead of 45m
    const worklogDurationSeconds = computed(() => WorklogItem.calculateDuration(startTime.value, endTime.value));
    const isEdit = ref(true);
    const currentItemId = ref('3'); // Editing item 3

    // Act
    const previewTotalSeconds = computed(() => {
      let total = 0;

      for (const existingItem of existingItems) {
        if (isEdit.value && existingItem.id === currentItemId.value) {
          continue; // Skip item 3
        }
        total += existingItem.durationSeconds;
      }

      total += worklogDurationSeconds.value;

      return total;
    });

    // Assert
    // Existing (excluding item 3): 1h 30m (5400s) + 1h 0m (3600s) = 2h 30m (9000s)
    // New duration for item 3: 2h 0m (7200s)
    // Total: 4h 30m (16200s)
    expect(previewTotalSeconds.value).toBe(16200);
  });

  it('handles empty existing worklogs', () => {
    // Arrange
    const existingItems: WorklogItem[] = [];

    const startTime = ref(new Date('2026-02-19T10:00:00'));
    const endTime = ref(new Date('2026-02-19T11:00:00'));
    const worklogDurationSeconds = computed(() => WorklogItem.calculateDuration(startTime.value, endTime.value));
    const isEdit = ref(false);
    const currentItemId = ref(undefined);

    // Act
    const previewTotalSeconds = computed(() => {
      let total = 0;

      for (const existingItem of existingItems) {
        if (isEdit.value && existingItem.id === currentItemId.value) {
          continue;
        }
        total += existingItem.durationSeconds;
      }

      total += worklogDurationSeconds.value;

      return total;
    });

    // Assert
    // Only new worklog: 1h 0m (3600s)
    expect(previewTotalSeconds.value).toBe(3600);
  });
});
