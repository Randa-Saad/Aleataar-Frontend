import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private service:CustomerService) { 
    this.LoadCustomer();
  }
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

customerdata:any;
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
      paging:true,
    lengthChange:false,
    language:{
      searchPlaceholder:'Text Customer'
    }

    };
  }

  LoadCustomer(){
    this.service.LoadCustomer().subscribe(data=>{
      this.customerdata=data;
    });
  }

  delete(ID:any){
    if(confirm("Do you want to remove?")){
    this.service.RemoveCustomer(ID).subscribe(data=>{
      this.LoadCustomer();
    });
  }
  }
}
