import { inject, provide, reactive } from 'vue'

export class TaskStore {
  // Try doing this without the `reactive()` call and investigate the differences.
  items = reactive([
    {
      done: false,
      text: 'Create blog website'
    },
    {
      done: false,
      text: 'Create to do app'
    },
    {
      done: false,
      text: 'Create blog article'
    },
    {
      done: false,
      text: 'Review blog article'
    }
  ])

  add (task: string) {
    this.items.push({
      done: false,
      text: task
    })
  }
}

export function provideTaskStore () {
  // Optionally return the new instance if you need it in the top-level component.
  provide('tasks', new TaskStore())
}

export function injectTaskStore () {
  return inject<TaskStore>('tasks')!
}
