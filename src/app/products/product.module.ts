import { NgModule} from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductData } from './product-data';
import { ProductResolver } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import  { ProductEditGuard } from './product-edit/product-edit.guard';

@NgModule({
  declarations:[
    ProductDetailComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    ProductEditComponent,
    ProductEditTagsComponent,
    ProductEditInfoComponent
 
  ],
  imports :[
   SharedModule,
   ReactiveFormsModule,
   InMemoryWebApiModule.forRoot(ProductData),
   RouterModule.forChild([
      { path: 'products', component: ProductListComponent},
      { 
        path: 'products/:id', 
        component: ProductDetailComponent,
        canActivate: [ProductDetailGuard ],
        resolve: { resolvedData: ProductResolver }
      },
      { 
        path: 'products/:id/edit', 
        component: ProductEditComponent,
        canDeactivate: [ProductEditGuard ],
        resolve: { resolvedData: ProductResolver },
        children: [
          { path:'', redirectTo: 'tags', pathMatch: 'full'},
          { path:'info', component: ProductEditInfoComponent},
          { path:'tags', component: ProductEditTagsComponent}
        ]
      }
    ])
  ]
  
})

export class ProductModule {

}

