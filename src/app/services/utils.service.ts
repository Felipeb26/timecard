import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor (private route: Router,
    private cookie: CookieService,) { }

  redirectOnUNAUTHORIZED(value: any) {
    const { status, statusText, url, ok, name, message, error } = value
    if (status) {
      if (status === 401) {
        this.cookie.deleteAll()
        window.location.href = "/login"
        return;
      }
    }
    console.table(value);
  }

}
