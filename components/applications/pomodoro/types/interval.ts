export class Interval {
  public readonly minutes: number
  public readonly seconds: number

  constructor(minutes: number, seconds: number) {
    this.minutes = minutes
    this.seconds = seconds
  }

  public addToDate(date: Date): Date {
    const totalSeconds = this.minutes * 60 + this.seconds
    const totalMs = totalSeconds * 1_000

    return new Date(date.getTime() + totalMs)
  }

  public toString(): string {
    return `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`
  }

  public static fromDates(startDate: Date, endDate: Date): Interval {
    const diffMs = endDate.getTime() - startDate.getTime()
    const diffSeconds = diffMs / 1_000

    return new Interval(Math.floor(diffSeconds / 60), Math.floor(diffSeconds % 60))
  }
}
