import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {WebsocketService} from '../websocket';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private websocketService: WebsocketService
  ) { }

  ngOnInit() {
  }
  username() {
    return this.authService.profile ? this.authService.profile.username : null;
  }
  isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  logout() {
    this.authService.logout();
    this.websocketService.init();
    this.router.navigate(['/'], { replaceUrl: true});
  }
}
