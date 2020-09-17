import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common'
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent} from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';


@NgModule({
  declarations:[
    WelcomeComponent
  ],
  imports:[
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      /**{
        // Lazy loading using loadChildren method.
         path: 'products',
        //data: { preload: false },
       // canL: [AuthGuard],
        loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
      }, */
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', component: PageNotFoundComponent }
      
    ]
    ,{
      enableTracing : true
    } 
    )],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{

}