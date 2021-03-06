import { Component } from '@angular/core';
import { LoaderService } from "./shared/loader.service";
import { AuthService } from './user/auth.service';
import { MessageService } from './message/message.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { slideInAnimation} from './app.animation';


@Component({
  selector: 'pm-root',
  styleUrls:['./app.component.css'],
  template: `
    <span class="fa fa-spinner spinner" *ngIf="loading"></span>
    <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{pageTitle}}</a>
    <ul class='navbar-nav'>
      <li class='nav-item'>
        <a class='nav-link' routerLinkActive='active'
        [routerLink]="['/welcome']">Home</a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' routerLinkActive='active'
        [routerLink]="['/products']">Product List</a>
      </li>
       <li class='nav-item'>
        <a class='nav-link' routerLinkActive='active'
        [routerLink]="['/products/0/edit']" [routerLinkActiveOptions]="{exact: true}">Add Product</a>
      </li>
    </ul>
    <ul class='navbar-nav ml-auto'>
       <li class='nav-item' *ngIf= 'isLoggedIn'>
           <a class="nav-link" [routerLink]="['/login']"> Welcome {{ userName}}</a>
       </li>
       <li class='nav-item' *ngIf= '!isMessageDisplayed'>
          <a class="nav-link" (click)="displayMessages()">Show Messages </a>
       </li>
        <li class='nav-item' *ngIf= 'isMessageDisplayed'>
           <a class="nav-link" (click)="hideMessages()">Hide Messages </a>
       </li>
       <li class='nav-item' *ngIf= '!isLoggedIn'>
           <a class="nav-link" [routerLink]="['/login']">Log In</a>
       </li>
       <li class='nav-item' *ngIf= 'isLoggedIn'>
           <a class="nav-link" (click)="logOut()">Log Out</a>
       </li>
    </ul>

    </nav>
    <div class='container'>
     <div class="row">
      <div class="col-md-10"
      [@slideInAnimation]="o.isActivated ? o.activatedRoute : ''">
        <router-outlet #o="outlet"><pm-loader></pm-loader></router-outlet>
      </div>
      <div class="col-md-2">
        <router-outlet name="popup"></router-outlet>
      </div>
      </div>
    </div>
  `,
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle: string = 'Product Management';
  loading: boolean = false;

  constructor(private loaderService: LoaderService,
              private authService: AuthService,
              private messageService: MessageService,
              private router : Router

  ){
    router.events.subscribe((routerEvent : Event)=>{
        this.checkRouterEvent(routerEvent);
    } );
   }

   checkRouterEvent(routerEvent : Event): void{
      if(routerEvent instanceof NavigationStart){
        this.loading = true;
      }
      if( routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
         routerEvent instanceof NavigationError){
           this.loading = false;

      }

   }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get userName(): String {
    if(this.authService.currentUser){
      return this.authService.currentUser.userName;
    }
    return '';
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup : ['messages']}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup : null} } ]);
    this.messageService.isDisplayed = false;

  }

   close(): void {
    this.router.navigate([{ outlets: { popup : null} } ]);
    this.messageService.isDisplayed = false;

  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }


 
}
