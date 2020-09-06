import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable} from 'rxjs';

export class AddHeadersInterceptors implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
    console.log(`AddHeadersInterceptors - ${req.url}`);
    let jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {'content-type': 'application/json'}
    });

   return next.handle(jsonReq);
  }

}