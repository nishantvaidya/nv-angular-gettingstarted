import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AddHeadersInterceptors } from "./add-headers.interceptors";

export const httpInterceptorProviders = [
 
 {provide: HTTP_INTERCEPTORS, useClass: AddHeadersInterceptors, multi: true}

];