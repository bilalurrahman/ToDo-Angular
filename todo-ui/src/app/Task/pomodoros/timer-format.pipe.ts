// timer-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerFormat'
})
export class TimerFormatPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    const minutes: number = Math.floor(value / 60);
    const seconds: number = value % 60;

    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
}