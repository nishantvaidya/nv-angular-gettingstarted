import { CanDeactivate } from "@angular/router";
import { ProductEditComponent } from "./product-edit.component";
import { Observable } from "rxjs";

export class ProductEditGuard implements CanDeactivate<ProductEditComponent>{
  canDeactivate(component: ProductEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if(component.productForm.dirty){
      const productName = component.productForm.get('productName').value || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName}?`);
    }
    return true;
  }

}