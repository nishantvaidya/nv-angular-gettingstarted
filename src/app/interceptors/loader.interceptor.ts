import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injector, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, finalize } from "rxjs/operators";
import { LoaderService } from "../shared/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{

  constructor(private injector: Injector){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    console.log('LoaderInterceptor');

    const loaderService = this.injector.get('LoaderService');

    loaderService.show();

    return next.handle(req).pipe(
      delay(3000),
      finalize(() => loaderService.hide() )
    );

  }
}