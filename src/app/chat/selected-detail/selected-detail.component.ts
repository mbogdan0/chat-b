import {Component, Input} from '@angular/core';
import {Contact} from '../contacts-box/contact/contact.model';

@Component({
  selector: 'app-selected-detail',
  templateUrl: './selected-detail.component.html',
  styleUrls: ['./selected-detail.component.scss']
})
export class SelectedDetailComponent {
  @Input() data: Contact;
  constructor() { }
}
