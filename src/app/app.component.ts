import { Component } from '@angular/core';
import { LoaderService } from "./shared/loader.service";


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
    </nav>
    <div class='container'>
     
      <router-outlet><pm-loader></pm-loader></router-outlet>
    </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';

  constructor(private loaderService: LoaderService){}
 
}
