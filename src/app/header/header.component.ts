import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;
  constructor(
    private authService: AuthService,
    private chRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.chRef.detectChanges();
  }

}
