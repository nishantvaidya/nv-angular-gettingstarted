import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor{

  private cache = new Map<string,any>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    console.log('CacheInterceptor')

    if(req.method !== 'GET'){
      return next.handle(req);
    }

    const cacheRes = this.cache.get(req.url);
    
    if(cacheRes){
      return of(cacheRes);
    }

    return next.handle(req).pipe(
      tap(event => {
        if(event instanceof HttpResponse){
          this.cache.set(req.url, event);

        }
      })
    )


  }


}