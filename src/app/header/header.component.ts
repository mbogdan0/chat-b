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
  public profile: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private websocketService: WebsocketService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.profile().subscribe(data => {
      this.profile = data;
    });
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
