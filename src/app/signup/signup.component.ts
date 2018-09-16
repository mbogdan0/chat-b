import {Component} from '@angular/core';
import {WebsocketService} from '../websocket';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [WebsocketService, UserService]
})
export class SignupComponent {
  public registerForm: any;
  public submitted = false;
  public errorMsg: string;
  constructor (
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private websocketService: WebsocketService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [<any>Validators.required, <any>Validators.email]],
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    }, { });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.userService.signup(this.registerForm.value).pipe(
        switchMap(() => this.authService.setProfile())
      ).subscribe(() => {
        this.websocketService.init();
        this.router.navigate(['/']);
        location.href = '/';
      }, err => {
        if (err.error && err.error.message) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = 'Unknown error';
        }
      });
    }
  }

}
