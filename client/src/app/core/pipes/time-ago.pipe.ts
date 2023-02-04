import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const inputDate = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (seconds < 60) {
      return 60;
    }
    if (minutes < 60) {
      return `${minutes} m`;
    }
    if (hours < 24) {
      return `${hours}hr`;
    }
    if (days < 7) {
      return `${days}d`;
    }

    if (months < 12) {
      return `${months}mnt`;
    }

    if (years) {
      return `${years}yr`;
    }
    return value;
  }
}
