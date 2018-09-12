import { Injectable } from '@angular/core';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly path: string = `${ env.apiUrl }/api/user`;
  constructor(
    private http: HttpClient
  ) { }

  public setToken(token: string, expires: number): void {
    const now = Date.now();
    const till = now + expires;
    localStorage.setItem(env.tokenStorage.fieldVal, token);
    localStorage.setItem(env.tokenStorage.fieldExp, till.toString());
    // TODO make sure that local storage value was set
  }

  public get isLoggedIn(): boolean {
    const token = localStorage.getItem(env.tokenStorage.fieldVal);
    const exp = localStorage.getItem(env.tokenStorage.fieldExp);
    const now = Date.now();
    return (token && exp && now < +exp);
  }
  public logout(): void {
    localStorage.removeItem(env.tokenStorage.fieldExp);
    localStorage.removeItem(env.tokenStorage.fieldVal);
    localStorage.removeItem(env.profileStorage);
  }
  public get token(): string {
    return localStorage.getItem(env.tokenStorage.fieldVal);
  }
  public setProfile(): Observable<any> {
    return this.http.get(`${ this.path }/profile`).pipe(
      tap((profile) => {
        localStorage.setItem(env.profileStorage, JSON.stringify(profile));
      })
    );
  }
  public get profile(): any {
    const obj = localStorage.getItem(env.profileStorage);
    if (typeof obj === 'string') {
      return JSON.parse(obj);
    }
    return obj;
  }

}
