import { OnInit, Component, ViewChildren, AfterViewInit, OnDestroy, ElementRef } from "@angular/core";
import { FormGroup, FormControlName, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { IProduct, ProductResolved} from '../product'
import { Subscription, Observable, fromEvent, merge } from "rxjs";
import { GenericValidator } from "../../shared/generic.validator";
import { NumberValidators } from '../../shared/number.validator';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { debounceTime } from "rxjs/operators";

@Component({
  templateUrl:'./product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit, AfterViewInit{
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Product Edit';
  errorMessage:string;
  productForm: FormGroup
  product: IProduct;
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

    this.route.data.subscribe(data =>{
      const resolvedData : ProductResolved = data['resolvedData'];
      this.getProduct(resolvedData);
    });
     
  }

  

  ngAfterViewInit(): void{
   const controlBlurs : Observable<any>[] = this.formInputElements.
              map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur') );
    
    merge(this.productForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe( value =>{
      this.displayMessage = this.genericValidator.processMessage(this.productForm);
    });
  }

  addTag() : void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }


  getProduct(resolvedData: ProductResolved): void {
     if(resolvedData.product){
     this.displayProduct(resolvedData.product);
     }
    this.errorMessage = resolvedData.error;
    
  }

  displayProduct(product: IProduct): void{
    console.log('Display product:' + JSON.stringify(product));
    if(this.productForm){
      this.productForm.reset();
    }
    this.product = product;
    if(this.product.id === 0){
      this.pageTitle = 'Add Product';
    }else{
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    })

    this.productForm.setControl('tags', this.fb.array(this.product.tags ||[]));
  }

  deleteProduct(product: IProduct): void{
    if(this.product.id === 0){
      this.onSaveComplete();
    }else{
      if(confirm(`Really delete the product: ${this.product.productName}`)){
        this.productService.deleteProduct(product.id).subscribe(
          {
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          }
        );
      }
    }
  }

  onSaveComplete():void{
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

  saveProduct(): void {
    if(this.productForm.valid){
      if(this.productForm.dirty){
        const p = {...this.product, ...this.productForm.value};
        if(p.id === 0){
          this.productService.createProduct(p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }else{
          this.productService.updateProduct(p).subscribe({
            next:()=> this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }
      }else{
        this.onSaveComplete();
      }
    }else {
      this.errorMessage = 'Please correct the validation errors.';
    }

  }


}