import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly path: string = `${ environment.apiUrl }/api/user`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  public signup(form: any): Observable<any> {
    return this.http.post(`${ this.path }/signup`, form).pipe(
      tap((body: any) => {
        if (body.token) {
          this.authService.setToken(body.token, body.expires);
        }
      })
    );
  }
  public login(form: any): Observable<any> {
    return this.http.post(`${ this.path }/signin`, form).pipe(
      tap((body: any) => {
        if (body.token) {
          this.authService.setToken(body.token, body.expires);
        }
      })
    );
  }

  public profile(): Observable<any> {
    return this.http.get(`${ this.path }/profile`);
  }
}
