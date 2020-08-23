import { NgModule} from '@angular/core';
import  { CommonModule} from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { StarComponent } from '../shared/star.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';

@NgModule({
  declarations:[
    ProductDetailComponent,
    ProductListComponent,
    ConvertToSpacesPipe
  ],
  imports :[
   RouterModule.forChild([
      { path: 'products', component: ProductListComponent},
      { 
        path: 'products/:id', 
        component: ProductDetailComponent,
        canActivate: [ProductDetailGuard ]
        },
    ]),
  
  ]
  
})

export class ProductModule {

}

