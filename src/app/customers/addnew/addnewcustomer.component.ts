import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { CustomerService } from 'src/app/service/customer.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-addnewcustomer',
  templateUrl: './addnewcustomer.component.html',
  styleUrls: ['./addnewcustomer.component.css']
})
export class AddnewcustomerComponent implements OnInit {
  public disabled = false;
  messageclass = ''
  message = ''
  customercode: any;
  editdata: any;
  responsedata: any;
  isedit = false;
  public textAreaForm!: FormGroup;

  constructor(private builder: FormBuilder,private service: CustomerService, private route: ActivatedRoute) {

    this.customercode = this.route.snapshot.paramMap.get('code');
    if (this.customercode != null) {
      console.log(this.route.snapshot.paramMap.get('code'));
      this.isedit = true;
      this.UpdateCustomer(this.customercode);
    }

    
    this.textAreaForm = this.builder.group({
      textArea: ""
    });

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

  insertMultiCustomers(): void
  {
    let customers =  this.textAreaForm?.get("textArea")?.value ;
    let splittedCustomers = customers.split(/\r?\n/);
    for(let p =0;p<splittedCustomers.length;p++) {
    var customerArr =  splittedCustomers[p].split("/");
    console.log("customerArr",customerArr);
    customerArr.splice(0, 0);
    let newCustomer = {code:customerArr[0],
                       name:customerArr[1],
                       email:customerArr[2],
                       phoneno:customerArr[3],
                       specialMark:customerArr[4],
                       area:customerArr[5],
                       address:customerArr[6]};
    this.service.SaveCustomer(newCustomer).subscribe(result => {
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
    }
  }

  disableUniAdd()
  {
    this.register = new FormGroup({
      code: new FormControl({value:'',disabled:true}),
      name: new FormControl({value:'',disabled:true}),
      email: new FormControl({value:'',disabled:true}),
      phoneno: new FormControl({value:'',disabled:true}),
      address: new FormControl({value:'',disabled:true}),
      area: new FormControl({value:'',disabled:true}),
      specialMark: new FormControl({value:'',disabled:true}),
    })
    this.disabled = true;
  }

  disableMultiCustomers()
  {
    this.textAreaForm = this.builder.group({
      textArea: new FormControl({value:'',disabled:true})
    });
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
