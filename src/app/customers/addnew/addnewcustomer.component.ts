import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CustomerService } from 'src/app/service/customer.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-addnewcustomer',
  templateUrl: './addnewcustomer.component.html',
  styleUrls: ['./addnewcustomer.component.css']
})
export class AddnewcustomerComponent implements OnInit {

  messageclass = ''
  message = ''
  customercode: any;
  editdata: any;
  responsedata: any;
  isedit = false;
  public textAreaForm!: FormGroup;
  pdfInsertionFormControl = new FormControl('',);

  constructor(private service: CustomerService, private route: ActivatedRoute) {

    this.customercode = this.route.snapshot.paramMap.get('code');
    if (this.customercode != null) {
      console.log(this.route.snapshot.paramMap.get('code'));
      this.isedit = true;
      this.UpdateCustomer(this.customercode);
    }
  }

  ngOnInit(): void {
  }

  register = new FormGroup({
    code: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phoneno: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    area: new FormControl("", Validators.required),
    specialMark: new FormControl("", Validators.required),
  });

  SaveCustomer() {
    if (this.register.valid) {
      console.log(this.register.value);
      this.service.SaveCustomer(this.register.value).subscribe(result => {
        debugger;
        if (result != null) {
          debugger;
          this.responsedata = result;
          if (this.responsedata.result == 'added') {
            this.message = "Customer saved successfully."
            this.messageclass = "sucess"
            this.clearCustomer();
          } else if (this.responsedata.result == 'updated') {
            this.message = "Customer saved successfully."
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

  clearCustomer() {
    this.register = new FormGroup({
      code: new FormControl(""),
      name: new FormControl(""),
      email: new FormControl(""),
      phoneno: new FormControl(""),
      address: new FormControl(""),
      area: new FormControl(""),
      specialMark: new FormControl(""),
    });
  }

  UpdateCustomer(code: any) {
    this.service.LoadCustomerbycode(code).subscribe(data => {
      this.editdata = data;

      this.register = new FormGroup({
        code: new FormControl(this.editdata.code),
        name: new FormControl(this.editdata.name),
        email: new FormControl(this.editdata.email),
        phoneno: new FormControl(this.editdata.phoneno),
        address: new FormControl(this.editdata.address),
      area: new FormControl(this.editdata.area),
      specialMark: new FormControl(this.editdata.specialMark),
      });
    });


  }

  insertMultiCustomers()
  {
    let customers =  this.textAreaForm?.get("textArea")?.value ;
    console.log(customers);
  }
  changeFormValidators()
  {
    this.register = new FormGroup({
      code: new FormControl(""),
      name: new FormControl("",),
      email: new FormControl(""),
      phoneno: new FormControl(""),
      address: new FormControl(""),
      area: new FormControl(""),
      specialMark: new FormControl(""),
    })
  }
  get name(){
    return this.register.get("name");
  }
  get email(){
    return this.register.get("email");
  }
  
  get area(){
    return this.register.get("area");
  }
  
  get address(){
    return this.register.get("address");
  }
  
  get specialMark(){
    return this.register.get("specialMark");
  }
}
