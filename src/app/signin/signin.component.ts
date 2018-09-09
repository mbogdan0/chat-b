import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  public loginForm: any;
  public errorMsg: string;
  constructor (
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private chRef: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    }, { });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMsg = null;
      this.userService.login(this.loginForm.value).subscribe(() => {
        this.chRef.detectChanges();
        this.router.navigate(['/']);
      }, err => {
        // TODO: implement better error handling
        if (err.error && err.error.message) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = 'Unknown error';
        }
      });
    }
  }
}
