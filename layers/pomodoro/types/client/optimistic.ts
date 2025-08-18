export class Optimistic<T> {
  constructor(optimisticValue: T, confirmValue: () => Promise<T>) {
    this.optimisticValue = optimisticValue;
    this.confirmedValue = confirmValue();
  }

  public optimisticValue: T;
  public confirmedValue: Promise<T>;
}
