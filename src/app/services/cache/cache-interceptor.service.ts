import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CacheResolverService } from './cache-resolver.service';

const TIME_TO_LIVE = 10;


@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor {

  constructor (private cacheResolver: CacheResolverService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== "GET") {
      return next.handle(req);
    }
    const cachedReponse = this.cacheResolver.getKey(req.url);
    return cachedReponse ? of(cachedReponse) : this.sendRequest(req, next);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          this.cacheResolver.setCache(req.url, event, TIME_TO_LIVE);
        }
      })
    )
  }

}
