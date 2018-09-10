import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
  providers: [AuthService]
})
export class ChatFormComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit() { }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }
}
