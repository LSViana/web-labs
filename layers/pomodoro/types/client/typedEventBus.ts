import type { TypedEvent, TypedEventHandler } from '~~/layers/pomodoro/types/client/typedEvent';

export class TypedEventBus {
  private handlers: Map<string, TypedEventHandler[]>;

  constructor() {
    this.handlers = new Map();
  }

  on(type: string, handler: TypedEventHandler): void {
    this.ensureHasType(type);
    this.handlers.get(type)!.push(handler);
  }

  off(type: string, handler: TypedEventHandler): void {
    this.ensureHasType(type);

    const handlers = this.handlers.get(type)!;
    const index = handlers.indexOf(handler);

    if (index >= 0) {
      handlers.splice(index, 1);
    }
  }

  trigger(event: TypedEvent): void {
    this.ensureHasType(event.type);

    this.handlers.get(event.type)!.forEach(x => x(event));
  }

  private ensureHasType(type: string) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
  }
}
