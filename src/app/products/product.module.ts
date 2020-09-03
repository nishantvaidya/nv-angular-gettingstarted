import { NgModule} from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';
import  { ProductEditGuard } from './product-edit.guard';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    ProductDetailComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    ProductEditComponent
  ],
  imports :[
   SharedModule,
   ReactiveFormsModule,
   InMemoryWebApiModule,
   RouterModule.forChild([
      { path: 'products', component: ProductListComponent},
      { 
        path: 'products/:id', 
        component: ProductDetailComponent,
        canActivate: [ProductDetailGuard ]
      },
      { 
        path: 'products/:id/edit', 
        component: ProductEditComponent,
        canActivate: [ProductEditGuard ]
      }
    ])
  ]
  
})

export class ProductModule {

}

