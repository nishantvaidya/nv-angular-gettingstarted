import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, of} from 'rxjs';
import { catchError , tap, map} from "rxjs/operators";
import { ThrowStmt } from "@angular/compiler";

@Injectable({
  providedIn:'root'
})
export class ProductService {
 /// private productUrl = 'api/products/products.json'
   private productUrl = 'assets/products/products.json';
  constructor(private http: HttpClient){

  }

  getProducts( ): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('data --'+ JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `this.productUrl/${id}`;
    return this.http.get<IProduct>(url)
          .pipe(
            tap(data => console.log('get Product: ' + JSON.stringify(data))),
            catchError(this.handleError)
          )
  }

  createProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({'content-type': 'application/json'});
    product.productId = null;

    return this.http.post<IProduct>(this.productUrl, product,  { headers }).pipe(
      tap(data => console.log('createProduct: ' + JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  deleteProduct(id: number): Observable<{}>{
    const headers = new HttpHeaders({'content-type': 'application/json'});
    const url = `this.productUrl/${id}`;
    return this.http.delete<IProduct>(url, { headers }).pipe(
      tap(data => console.log('deleteProduct: '+ id)),
      catchError(this.handleError)
    )
  }

  updateProduct(product: IProduct): Observable<IProduct>{
    const headers = new HttpHeaders({'content-type': 'application/json'});
    const url = `this.productUrl/${product.productId}`;
    return this.http.put<IProduct>(url, product, { headers }).pipe(
      tap(() => console.log('updateProduct: ' + product.productId)),
      map(() => product),
      catchError(this.handleError)
    )
  }

  initializeProduct():IProduct {
     return {
      productId: 0,
      productName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null,
      caculateDiscount: null
    };

  }

  handleError(err: HttpErrorResponse){
    let errorMessage = '';

    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    } else{
      errorMessage = `Server returned error code: ${err.status}, error message is ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);

  }

}