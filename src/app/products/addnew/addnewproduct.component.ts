import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-addnewproduct',
  templateUrl: './addnewproduct.component.html',
  styleUrls: ['./addnewproduct.component.css']
})
export class AddnewproductComponent implements OnInit {

  messageclass = ''
  message = ''
  productid: any;
  editdata: any;
  responsedata: any;

  constructor(private service: ProductService, private route: ActivatedRoute) {

    this.productid = this.route.snapshot.paramMap.get('id');
    if (this.productid != null) {
      this.UpdateProduct(this.productid);
    }
  }

  ngOnInit(): void {
  }

  register = new FormGroup({
    id: new FormControl({ value: "", disabled: true }),
    code: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
  });

  SaveProduct() {
    if (this.register.valid) {
      console.log(this.register.value);
      this.service.SaveProduct(this.register.value).subscribe(result => {
        if (result != null) {
          this.responsedata = result;
          if (this.responsedata.message == 'added') {
            this.message = "Product saved successfully."
            this.messageclass = "sucess"
            this.clearProduct();
          } else if (this.responsedata.message == 'updated') {
            this.message = "Product saved successfully."
            this.messageclass = "sucess"
          } else {
            this.message = "Failed to Save"
            this.messageclass = "error"
          }

        }
      });
    } else {
      this.message = "Please Enter valid data"
      this.messageclass = "error"
    }
  }

  clearProduct() {
    this.register = new FormGroup({
      id: new FormControl(""),
      code: new FormControl(""),
      name: new FormControl(""),
      price: new FormControl(""),
    });
  }

  UpdateProduct(Id: any) {
    this.service.LoadProductbycode(Id).subscribe(data => {
      this.editdata = data;
      this.register = new FormGroup({
        id: new FormControl(this.editdata.id),
        code: new FormControl(this.editdata.code),
        name: new FormControl(this.editdata.name),
        price: new FormControl(this.editdata.price),
      });
    });


  }

  get name(){
    return this.register.get("name");
  }
  get price(){
    return this.register.get("price");
  }
}
