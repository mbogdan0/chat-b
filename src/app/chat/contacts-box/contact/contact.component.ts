import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contact} from './contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() data: Contact;
  @Output() activate = new EventEmitter<string>();

  constructor() { }

  makeActive() {
    if (!this.data.active) {
      this.activate.emit(this.data.id);
    }
  }

}
