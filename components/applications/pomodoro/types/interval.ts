export class Interval {
  public readonly minutes: number
  public readonly seconds: number

  constructor(minutes: number, seconds: number) {
    const totalSeconds = minutes * 60 + seconds
    const finalMinutes = totalSeconds > 0 ? Math.floor(totalSeconds / 60) : Math.ceil(totalSeconds / 60)
    const finalSeconds = totalSeconds > 0 ? Math.floor(totalSeconds % 60) : Math.ceil(totalSeconds % 60)

    this.minutes = finalMinutes
    this.seconds = finalSeconds
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
    const minutes = Math.abs(this.minutes)
    const seconds = Math.abs(this.seconds)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  public static fromDates(startDate: Date, endDate: Date): Interval {
    const diffMs = endDate.getTime() - startDate.getTime()
    const diffSeconds = Math.ceil(diffMs / 1_000)

    return new Interval(0, diffSeconds)
  }
}
