import { Component } from '@angular/core';
import { LoaderService } from "./shared/loader.service";
import { AuthService } from './user/auth.service';
import { MessageService } from './message/message.service';
import { Router } from '@angular/router';


@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{pageTitle}}</a>
    <ul class='navbar-nav'>
      <li class='nav-item'>
        <a class='nav-link' routerLinkActive='active'
        [routerLink]="['/welcome']">Home</a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact:true}"
        [routerLink]="['/products']">Product List</a>
      </li>
       <li class='nav-item'>
        <a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact:true}"
        [routerLink]="['/products/0/edit']">Add Product</a>
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
        <router-outlet><pm-loader></pm-loader></router-outlet>
      </div>
      <div class="col-md-2">
        <router-outlet name="popup"></router-outlet>
      </div>

      </div>
    </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';

  constructor(private loaderService: LoaderService,
              private authService: AuthService,
              private messageService: MessageService,
              private router : Router

  ){}

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
    this.router.navigate([{ outlet: { popup : ['messages']}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlet: { popup : [null]}}]);
    this.messageService.isDisplayed = false;

  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }


 
}
