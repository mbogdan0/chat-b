import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../websocket';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [WebsocketService]
})
export class SignupComponent implements OnInit {
  public registerForm: any;
  constructor(
    private wsService: WebsocketService,
    private fb: FormBuilder
  ) {

    this.registerForm = this.fb.group({
      email: ['', [<any>Validators.required, <any>Validators.email]],
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    }, { });

  }

  ngOnInit() {
    this.wsService.on('news').subscribe(a => {
      console.log(a);
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      alert(1);
    }
  }

}
