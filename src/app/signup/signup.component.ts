import {Component} from '@angular/core';
import {WebsocketService} from '../websocket';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

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
    private router: Router
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
      this.userService.signup(this.registerForm.value).subscribe(() => {

        this.router.navigate(['/'], {replaceUrl: true});
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
