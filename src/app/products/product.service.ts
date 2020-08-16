import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json'

  constructor(private http: HttpClient){

  }

  getProduct(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl);
  }

}