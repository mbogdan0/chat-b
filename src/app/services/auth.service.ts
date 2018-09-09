import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
  }
  public get token(): string {
    return localStorage.getItem(env.tokenStorage.fieldVal);
  }

}
