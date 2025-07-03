import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit = 100,
    completeWords = false,
    ellipsis = '...'
  ): string {
  if (!value) return '';
      if (value.length <= limit) return value;

      if (completeWords) {
        const trimmed = value.substring(0, limit);
        const lastSpace = trimmed.lastIndexOf(' ');
        return value.substring(0, lastSpace !== -1 ? lastSpace : limit) + ellipsis;
      }

      return value.substring(0, limit) + ellipsis;
  }
}
