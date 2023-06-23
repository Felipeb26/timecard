import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, finalize } from "rxjs";
import { LoadingService } from '../loading.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor (
    private cookie: CookieService,
    private load: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.load.show();

    let request:any;

    if (this.cookie.get("auth").trim() != ""){
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cookie.get("auth")}`,
        }
      })
    }else{
      request = req.clone();
    }


    return next.handle(request).pipe(
      finalize(() => {
        this.load.hide()
      })
    );
  }
}
