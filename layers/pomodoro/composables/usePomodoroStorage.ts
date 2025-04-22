import { inject, provide } from 'vue';

import { usePomodoroNow } from '~~/layers/pomodoro/composables/usePomodoroNow';
import { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';

const url = '/api/pomodoro/records';

function transform(record: PomodoroRecord): PomodoroRecord {
  return new PomodoroRecord(
    record.id,
    new Date(record.startTime),
    new Date(record.endTime),
    record.type,
  );
}

function buildPomodoroStorage() {
  const now = usePomodoroNow();

  async function save(record: PomodoroRecord): Promise<PomodoroRecord> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const rawRecord = await response.json();

    return new PomodoroRecord(
      rawRecord.id,
      new Date(rawRecord.startTime),
      new Date(rawRecord.endTime),
      rawRecord.type,
    );
  }

  async function update(record: PomodoroRecord): Promise<void> {
    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function load(date: Date): Promise<PomodoroRecord[]> {
    const query = new URLSearchParams({
      date: date.toLocaleDateString(),
    });

    const response = await fetch(`${url}?${query}`);

    const items = await response.json() as PomodoroRecord[];

    return items.map(transform);
  }

  async function remove(record: PomodoroRecord): Promise<void> {
    const query = new URLSearchParams({
      id: record.id.toString(),
    });

    await fetch(`${url}?${query.toString()}`, {
      method: 'DELETE',
    });
  }

  async function loadToday(): Promise<PomodoroRecord[]> {
    return load(now.get());
  }

  return {
    save,
    update,
    load,
    remove,
    loadToday,
  };
}

export function providePomodoroStorage() {
  provide('pomodoroStorage', buildPomodoroStorage());
}

export function usePomodoroStorage() {
  return inject('pomodoroStorage') as ReturnType<typeof buildPomodoroStorage>;
}
