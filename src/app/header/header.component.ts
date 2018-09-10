import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private chRef: ChangeDetectorRef,
    private router: Router
  ) { }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'], { replaceUrl: true});
  }

}
