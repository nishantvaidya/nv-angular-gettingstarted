import { OnInit, Component } from "@angular/core";
import  { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductResolved } from "./product";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

   pageTitle: string;
   product: IProduct;
   errroMessage : string;

   constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    const resolvedData: ProductResolved = this.route.snapshot.data['resolvedData'];
    console.log(`resolvedData: ${resolvedData.product}`);
    this.errroMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);

 }

  onProductRetrieved(product:IProduct): void {
    this.product = product;
    if(this.product){
      this.pageTitle = `Product Detail: ${product.productName}`;
    }else{
      this.pageTitle = 'No product found';
    }


  }

 onBack():void {
    this.router.navigate(['/products']);
  }

}