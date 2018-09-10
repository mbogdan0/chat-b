import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from '../chat/contacts-box/contact/contact.model';

@Pipe({
  name: 'onlines'
})
export class OnlinesPipe implements PipeTransform {

  transform(items: Contact[], onlyOnline: boolean): any[] {
    if (!items) {
      return [];
    }
    if (!onlyOnline) {
      return items;
    }
    return items.filter(item => item.online);
  }

}
