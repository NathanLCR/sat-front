import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (value.length === 10) {
      return value.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
    }
    return '';
  }
}
