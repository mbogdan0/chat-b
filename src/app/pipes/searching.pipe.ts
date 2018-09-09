import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from '../chat/contacts-box/contact/contact.model';

@Pipe({
  name: 'searching'
})
export class SearchingPipe implements PipeTransform {

  transform(items: Contact[], value: string): any[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    return items.filter(item => item.username.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }

}
