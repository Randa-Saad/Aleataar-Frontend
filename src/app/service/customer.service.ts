import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
apiurl='https://localhost:7118/Customer';
  constructor(private http:HttpClient) {

   }

   LoadCustomer(){
     return this.http.get(this.apiurl+"/GetAll");
   }
   SaveCustomer(customedata:any){
    return this.http.post(this.apiurl+"/SaveCustomer",customedata);
   }
   LoadCustomerbycode(id:any){
    return this.http.get(this.apiurl+'/GetByCode?Code='+id);
  }
  RemoveCustomer(id:any){
    console.log(this.apiurl+'/Remove?CustomerCode='+id);
    return this.http.delete(this.apiurl+'/Remove?CustomerCode='+id);
  }
}
