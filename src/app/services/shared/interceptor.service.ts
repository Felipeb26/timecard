import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharePointService } from './share-point.service';
import { Observable, finalize } from "rxjs";
import { LoadingService } from '../loading.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor (private load: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.load.show();
    return next.handle(req).pipe(
      finalize(() =>{
        this.load.hide()
      })
    );
  }
}
