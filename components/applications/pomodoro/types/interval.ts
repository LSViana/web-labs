export class Interval {
  public readonly minutes: number
  public readonly seconds: number

  constructor(minutes: number, seconds: number) {
    this.minutes = minutes
    this.seconds = seconds
  }

  public toString(): string {
    return `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`
  }
}
