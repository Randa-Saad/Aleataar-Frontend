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
  productcode: any;
  editdata: any;
  responsedata: any;

  constructor(private service: ProductService, private route: ActivatedRoute) {

    this.productcode = this.route.snapshot.paramMap.get('code');
    if (this.productcode != null) {
      this.UpdateProduct(this.productcode);
    }
  }

  ngOnInit(): void {
  }

  register = new FormGroup({
    code: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    consumedPrice: new FormControl("", Validators.required),
    segmentedPrice: new FormControl("", Validators.required),
    totalizedPrice: new FormControl("", Validators.required),
    countedPieces: new FormControl("", Validators.required),
    countedBoxes: new FormControl("", Validators.required),
    countedCtns: new FormControl("", Validators.required)

  });

  SaveProduct() {
    debugger;
    if (this.register.valid) {
      console.log(this.register.value);
      this.service.SaveProduct(this.register.value).subscribe(result => {
        debugger;
        if (result != null) {
          this.responsedata = result;
          if (this.responsedata.result == 'added') {
            this.message = "Product saved successfully."
            this.messageclass = "sucess"
            this.clearProduct();
          } else if (this.responsedata.result == 'updated') {
            this.message = "Product updated successfully."
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
    code: new FormControl(""),
    name: new FormControl(""),
    consumedPrice: new FormControl(""),
    segmentedPrice: new FormControl(""),
    totalizedPrice: new FormControl(""),
    countedPieces: new FormControl(""),
    countedBoxes: new FormControl(""),
    countedCtns: new FormControl("")
    });
  }

  UpdateProduct(code: any) {
    debugger;
    this.service.LoadProductbycode(code).subscribe(data => {
      this.editdata = data;

      this.register = new FormGroup({
        code: new FormControl(this.editdata.code),
        name: new FormControl(this.editdata.name),
        consumedPrice: new FormControl(this.editdata.consumedPrice),
        segmentedPrice: new FormControl(this.editdata.segmentedPrice),
        totalizedPrice: new FormControl(this.editdata.totalizedPrice),
        countedPieces: new FormControl(this.editdata.countedPieces),
        countedBoxes: new FormControl(this.editdata.countedBoxes),
        countedCtns: new FormControl(this.editdata.countedCtns)
      });
    });


  }

  get code(){
    return this.register.get("code");
  }
  get name(){
    return this.register.get("name");
  }
  get consumedPrice(){
    return this.register.get("consumedPrice");
  }
  get segmentedPrice(){
    return this.register.get("segmentedPrice");
  }
  get totalizedPrice(){
    return this.register.get("totalizedPrice");
  }
  get countedPieces(){
    return this.register.get("countedPieces");
  }
  get countedBoxes(){
    return this.register.get("countedBoxes");
  }
  get countedCtns(){
    return this.register.get("countedCtns");
  }

}
