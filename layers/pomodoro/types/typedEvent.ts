export class TypedEvent {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
}

export type TypedEventHandler = (event: TypedEvent) => void;
