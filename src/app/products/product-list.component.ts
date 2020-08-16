import { Component, OnInit } from '@angular/core';
import { IProduct } from './product'
import { ProductService } from './product.service';


@Component({
   selector : 'pm-products',
   templateUrl : './product-list.component.html',
   styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string ;
   _listFilter: string;
   filteredPrdoucts: IProduct[];


   get listFilter(){
      return this._listFilter
   }

   set listFilter(value:string){
      this._listFilter = value;
      this.filteredPrdoucts = this.listFilter ? this.performFilter(this.listFilter): this.products;
   }

  constructor(private productService: ProductService){
  }
 

 toggleImage(): void {
   this.showImage = !this.showImage;
 }

 ngOnInit(): void {
   console.log("On Init");
    this.productService.getProduct().subscribe({
     next: products => {
      this.products  = products;
      this.filteredPrdoucts = this.products;
     },
     error: err => this.errorMessage = err
    });  
 }

 performFilter(filterBy: string): IProduct[]{
   filterBy = filterBy.toLocaleLowerCase();
   return this.products.filter((product: IProduct) => product.productName.
   toLocaleLowerCase().indexOf(filterBy) !== -1);

 }

 OnRatingClick(message: string):void{
   this.pageTitle = 'Product List: '+ message;

 }

}