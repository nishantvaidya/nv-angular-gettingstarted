import { OnInit, Component, ViewChildren, AfterViewInit, OnDestroy, ElementRef } from "@angular/core";
import { FormGroup, FormControlName, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { IProduct} from './product'
import { Subscription, Observable, fromEvent } from "rxjs";
import { GenericValidator } from "../shared/generic.validator";
import { NumberValidators } from '../shared/number.validator';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./product.service";

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
  private validationMessages:{[key: string]: {[key: string]: string}};
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService){
    this.validationMessages = {
      productName:{
        required: 'Product name is required.',
        minlength: 'Product length must be at least 3 characters.',
        maxlength: 'Product name can not be exceeds 50 characters.'
      },
      productCode:{
        required: 'Product code is required.'
      },
      starRating:{
        range: 'Rate the product between 1(lowest) and 5(highest).'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }



  ngOnInit(): void{
    this.productForm = this.fb.group({
      productName:['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      productCode:['',[Validators.required]],
      starRating:['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });

    this.sub =  this.route.paramMap.subscribe(
      params =>{
        const id = +params.get('id');
        this.getProduct(id);
      }
    );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();

  }

  ngAfterViewInit(): void{

    const controlBlurs : Observable<any>[] = this.formInputElements.
              map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur') );



  }
}