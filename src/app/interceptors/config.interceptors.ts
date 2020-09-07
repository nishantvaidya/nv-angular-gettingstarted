import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AddHeadersInterceptors } from "./add-headers.interceptors";
import { LoaderInterceptor } from "./loader.interceptor";
import { CacheInterceptor } from "./cache.interceptor";
import { LogResponseInterceptor } from "./log-response.interceptor";

export const httpInterceptorProviders = [
 
 {provide: HTTP_INTERCEPTORS, useClass: AddHeadersInterceptors, multi: true},
 {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
 {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
 {provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true}

];