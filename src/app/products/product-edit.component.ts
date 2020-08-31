import { OnInit, Component, ViewChildren, AfterViewInit, OnDestroy, ElementRef } from "@angular/core";
import { FormGroup, FormControlName } from "@angular/forms";
import { IProduct} from './product'
import { Subscription } from "rxjs";

Component({
  templateUrl:'./product-edit.component.html'
})

export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Product Edit';
  errorMessage:string;
  productForm: FormGroup
  product: IProduct;
  private sub: Subscription;
  displayMessage:{[key: string]: string} = {};
  private validationMessage:{[key: string]: {[key: string]: string}}



  ngOnInit(){

  }

  ngOnDestroy( ){

  }

  ngAfterViewInit(){

  }
}