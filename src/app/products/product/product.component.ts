import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private service:ProductService) { 
    this.LoadProduct();
    this.productdata=this.LoadProduct();
  }
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

productdata:any;
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
    //  paging:false
    lengthChange:false,
    language:{
      searchPlaceholder:'Text Product'
    }

    };
  }

  LoadProduct(){
    this.service.LoadProduct().subscribe(data=>{
      this.productdata=data;
    });
  }

  delete(ID:any){
    if(confirm("Do you want to remove?")){
    this.service.RemoveProduct(ID).subscribe(data=>{
      this.LoadProduct();
    });
  }
  }
}
