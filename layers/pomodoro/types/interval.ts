export class Interval {
  private static readonly minutesPerHour = 60;
  private static readonly secondsPerHour = 3_600;
  private static readonly secondsPerMinutes = 60;

  public readonly hours: number;
  public readonly minutes: number;
  public readonly seconds: number;

  constructor(hours: number, minutes: number, seconds: number) {
    const totalSeconds = hours * Interval.secondsPerHour + minutes * Interval.secondsPerMinutes + seconds;

    const finalHours = totalSeconds > 0
      ? Math.floor(totalSeconds / Interval.secondsPerHour)
      : Math.ceil(totalSeconds / Interval.secondsPerHour);
    const finalMinutes = (totalSeconds > 0
      ? Math.floor(totalSeconds / Interval.secondsPerMinutes)
      : Math.ceil(totalSeconds / Interval.secondsPerMinutes)) % Interval.minutesPerHour;
    const finalSeconds = totalSeconds > 0
      ? Math.floor(totalSeconds % Interval.secondsPerMinutes)
      : Math.ceil(totalSeconds % Interval.secondsPerMinutes);

    this.hours = finalHours;
    this.minutes = finalMinutes;
    this.seconds = finalSeconds;
  }

  get totalSeconds(): number {
    return this.hours * Interval.secondsPerHour
      + this.minutes * Interval.secondsPerMinutes
      + this.seconds;
  }

  public addInterval(interval: Interval): Interval {
    const totalSeconds1 = this.totalSeconds;
    const totalSeconds2 = interval.totalSeconds;

    return new Interval(0, 0, totalSeconds1 + totalSeconds2);
  }

  public subtractInterval(interval: Interval): Interval {
    return this.addInterval(new Interval(0, 0, -interval.totalSeconds));
  }

  public toString(): string {
    const hours = Math.abs(this.hours);
    const minutes = Math.abs(this.minutes);
    const seconds = Math.abs(this.seconds);

    if (hours > 0) {
      return `${Interval.formatNumber(hours)}:${Interval.formatNumber(minutes)}:${Interval.formatNumber(seconds)}`;
    }

    return `${Interval.formatNumber(minutes)}:${Interval.formatNumber(seconds)}`;
  }

  public static fromDates(startDate: Date, endDate: Date): Interval {
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffSeconds = Math.round(diffMs / 1_000);

    return new Interval(0, 0, diffSeconds);
  }

  private static formatNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
