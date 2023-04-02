import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
apiurl='https://localhost:7118/Product';
  constructor(private http:HttpClient) {

   }

   LoadProduct(){
     return this.http.get(this.apiurl+"/GetAll");
   }
   SaveProduct(productdata:any){
    return this.http.post(this.apiurl,productdata);
   }
   LoadProductbycode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  RemoveProduct(id:any){
    return this.http.delete(this.apiurl+'/'+id);
  }

}
