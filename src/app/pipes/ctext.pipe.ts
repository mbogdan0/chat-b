import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ctext'
})
export class CtextPipe implements PipeTransform {
  transform(value: string, limit: number): any {
    return value ? (value.substr(0, limit) + (value.length > limit ? '…' : '')) : '';
  }

}
