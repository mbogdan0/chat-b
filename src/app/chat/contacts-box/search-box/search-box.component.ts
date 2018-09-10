import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Output() searching = new EventEmitter<string>();
  constructor() { }

  search(val: string) {
    this.searching.emit(val);
  }

}
