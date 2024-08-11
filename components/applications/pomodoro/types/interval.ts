export class Interval {
  public readonly minutes: number
  public readonly seconds: number

  constructor(minutes: number, seconds: number) {
    const totalSeconds = Math.abs(minutes) * 60 + Math.abs(seconds)
    const finalMinutes = minutes < 0 ? Math.ceil(totalSeconds / 60) : Math.floor(totalSeconds / 60)
    const finalSeconds = seconds < 0 ? Math.ceil(totalSeconds % 60) : Math.floor(totalSeconds % 60)

    this.minutes = minutes < 0 ? -finalMinutes : finalMinutes
    this.seconds = seconds < 0 ? -finalSeconds : finalSeconds
  }

  get totalSeconds(): number {
    return this.minutes * 60 + this.seconds
  }

  public addInterval(interval: Interval): Interval {
    const totalSeconds1 = this.totalSeconds
    const totalSeconds2 = interval.totalSeconds

    return new Interval(0, totalSeconds1 + totalSeconds2)
  }

  public subtractInterval(interval: Interval): Interval {
    return this.addInterval(new Interval(0, -interval.totalSeconds))
  }

  public toString(): string {
    return `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`
  }
}
