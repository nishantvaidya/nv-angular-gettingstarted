import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { IProduct } from "../product";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {

   @ViewChild(NgForm) productForm: NgForm;

   errorMessage: string;
   product: IProduct;

  constructor(private route: ActivatedRoute){}
  
  ngOnInit(){

    this.route.parent.data.subscribe(data =>{
      if(this.productForm){
        this.productForm.reset();
      }
      this.productForm = data['resolvedData'].product;

    });


  }

}