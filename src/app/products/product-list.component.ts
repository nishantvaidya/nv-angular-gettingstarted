import { Component, OnInit } from '@angular/core';
import { IProduct } from './product'
import { ProductService } from './product.service';
import { ActivatedRoute} from '@angular/router';


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
   products: IProduct[] = [];


   get listFilter(){
      return this._listFilter
   }

   set listFilter(value:string){
      this._listFilter = value;
      this.filteredPrdoucts = this.listFilter ? this.performFilter(this.listFilter): this.products;
   }

  constructor(private productService: ProductService, private route: ActivatedRoute){
  }
 

 toggleImage(): void {
   this.showImage = !this.showImage;
 }

 ngOnInit(): void {
   console.log("On Init");
   this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
   this.showImage =   this.route.snapshot.queryParamMap.get('showImage') === 'true';
    this.productService.getProducts().subscribe({
     next: products => {
      this.products  = products;
      this.filteredPrdoucts = this.performFilter(this.listFilter);
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