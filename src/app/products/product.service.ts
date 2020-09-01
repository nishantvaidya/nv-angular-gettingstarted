import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError , tap} from "rxjs/operators";
import { ThrowStmt } from "@angular/compiler";

@Injectable({
  providedIn:'root'
})
export class ProductService {
 /// private productUrl = 'api/products/products.json'
   private productUrl = 'assets/products/products.json';
  constructor(private http: HttpClient){

  }

  getProduct(id: number ): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('data --'+ JSON.stringify(data))),
      catchError(this.handleError)
    )
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