import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor (private cookie: CookieService) { }

  private jwt = new JwtHelperService();

  private isUserOn = new BehaviorSubject<boolean>(false);
  public userOn = this.isUserOn.asObservable();

  isUserLogged(value: boolean) {
    return this.isUserOn.next(value);
  }

  isLogged(): boolean {
    const cookie = this.cookie.get("auth");
    if (cookie.trim() == "" || cookie == null || cookie == undefined) {
      return false;
    }
    return true;
  }

  decodeToken(token: string) {
    const { sub, iat, exp } = this.jwt.decodeToken(token);
    return { sub, iat, exp };
  }

}
