import { CanActivate, CanLoad, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment , Route} from "@angular/router";
import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  constructor(private authService: AuthService, private router: Router){ }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        return this.checkLoggedIn(state.url);
    }

 

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkLoggedIn(segments.join('/'));

  }

  checkLoggedIn(url: string): boolean{
    if(this.authService.isLoggedIn){
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;

  }




}