import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup ,FormsModule, FormControl} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../service/master.service';
import { ToastrService } from 'ngx-toastr'
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent implements OnInit {
  formBuilder: any;
  pdfInsertionForm: any;

  constructor(private builder: FormBuilder, private service: MasterService, private router: Router, private alert: ToastrService,
    private activeroute: ActivatedRoute) { 

      this.pdfInsertionForm = this.builder.group({
        pdfinsertion: this.builder.control('')
      });

      this.textAreaForm = this.builder.group({
        textArea: ""
      });

    }
  pagetitle = "Create Invoice"
  invoicedetail !: FormArray<any>;
  invoiceproduct !: FormGroup<any>;
  
  public textAreaForm!: FormGroup;
  pdfInsertionFormControl = new FormControl('',);

  mastercustomer: any;
  masterdassistant:any;
  masterproduct: any;
  editinvoiceno: any;
  isedit = false;
  editinvdetail: any;
  Types: any = ['Ctn', 'Box', 'Piece'];

  ngOnInit(): void {
    this.GetCustomers();
    this.GetProducts();
    this.GetDAssistants();

    this.editinvoiceno = this.activeroute.snapshot.paramMap.get('invoiceno');
    if (this.editinvoiceno != null) {
      this.pagetitle = "Edit Invoice";
      this.isedit = true;
      this.SetEditInfo(this.editinvoiceno);
    }

  }
  

  onClickSubmit(data:any) {
    alert("Entered Email id : " + data.pdfinsertiontext);
 }

 insertInvoiceOnRecords(): void
 {

    let pdfText =  this.textAreaForm?.get("textArea")?.value ;
    //console.log(pdfText);
    let speratedNos = pdfText?.replaceAll(" " , "-");
    let splittedProducts = speratedNos.split(/\r?\n/);
    for(let p =0;p<splittedProducts.length;p++) {
      //let line = splittedProducts[p];
    var productArr =  splittedProducts[p].split("-");
    productArr.splice(0, 0);
    let salesprice: number = productArr[2];
    let quantity : number= productArr[3];
    let productcode = productArr[productArr.length -1];
    let proddata: any;
    let productdescription: string ;
    this.service.GetProductbycode(productcode).subscribe(res => 
      {proddata = res;
        debugger;
        if(productcode=="4563") console.log(productArr);
        if(proddata !=null)
        {
          productdescription=proddata.name;
          this.invoicedetail.push(this.generateAutomatedRow(productcode, productdescription, quantity, salesprice));
        } 
    });


   }
  // this.Removeproduct(0);
 }

 generateAutomatedRow(productcode: string,productname: string,quantity: number,salesprice: number) {
  return this.builder.group({
    invoiceNo: this.builder.control(''),
    productCode: this.builder.control(productcode, Validators.required),
    productName: this.builder.control(productname),
    qty: this.builder.control(quantity),
    salesPrice: this.builder.control(salesprice),
    total: this.builder.control({ value: salesprice*quantity, disabled: true })
  });
}

  invoiceform = this.builder.group({
    invoiceNo: this.builder.control('', Validators.required),
    customerId: this.builder.control('', Validators.required),
    customerName: this.builder.control(''),
    dassistantId: this.builder.control('', Validators.required),
    dassistantName: this.builder.control(''),
    deliveryAddress: this.builder.control(''),
    whMp: this.builder.control('', Validators.required),
    type: this.builder.control('', Validators.required),
    restricted: this.builder.control('No', Validators.required),
    orderDate: this.builder.control(''),
    delieveryDate: this.builder.control(''),
    remarks: this.builder.control(''),
    total: this.builder.control({ value: 0, disabled: true }),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    details: this.builder.array([])

  });



  onSubmit(data: any): void {
    debugger;
    // Process checkout data here
   // this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', data.value);
    //this.checkoutForm.reset();
  }

async  SetEditInfo(invoiceno: any) {
  debugger;
    this.service.GetInvDetailbycode(invoiceno).subscribe(res => {
      this.editinvdetail = res;
      //console.log("result", res);
      for (let i = 0; i < this.editinvdetail.length; i++) {
        this.addnewproduct();
        // console.log(this.addnewproduct());
      };
    });

    this.service.GetInvHeaderbycode(invoiceno).subscribe(async res => {
      let editdata: any;
      editdata = res;
      //console.log("editdata.orderDate ",editdata.orderDate);
      //console.log("editdata.deliveryDate ",editdata.delieveryDate);
      const datepipe: DatePipe = new DatePipe('en-US')
      if (editdata != null) {
        debugger;
        this.invoiceform.patchValue({
          invoiceNo: editdata.invoiceNo
          , customerId: editdata.customerId
          , customerName: editdata.customerName
          , dassistantId: editdata.dAssistantId 
          , dassistantName: editdata.dAssistantName
          , deliveryAddress: editdata.deliveryAddress
          , whMp:editdata.whMp
          , type:editdata.type
          , restricted:editdata.restricted
          , orderDate: datepipe.transform(editdata.orderDate, 'MM/dd/yyyy') 
          , delieveryDate:datepipe.transform(editdata.delieveryDate, 'MM/dd/yyyy') 
          , remarks: editdata.remarks
          , total: editdata.total
          , tax: editdata.tax
          , netTotal: editdata.netTotal
          , details:await this.editinvdetail});
        //console.log("hay bel :", typeof(datepipe.transform(editdata.orderDate, 'MM/dd/yyyy'))); //sh8ala
      }
    });
    console.log(this.editinvdetail);
  }


  SaveInvoice() {
    debugger;
    if (this.invoiceform.valid) {
      debugger;
      //console.log(this.invoicedetail);
      //console.log(this.invoiceform.getRawValue().details);
      this.service.SaveInvoice(this.invoiceform.getRawValue()).subscribe(res => {
        let result: any;
        result = res;
        if (result.result == 'pass') {
          if(this.isedit){
            debugger;
            this.alert.success('Updated Successfully.', 'Invoice :' + result.kyValue);
          }else{
            debugger;
          this.alert.success('Created Successfully.', 'Invoice :' + result.kyValue);
          }
          debugger;
          this.router.navigate(['/']);
        } else {
          this.alert.error('Failed to save.', 'Invoice');
        }
      });
    } else {
      this.alert.warning('Please enter values in all mandatory filed', 'Validation');
    }

  }

  addnewproduct() {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;

    let customercode = this.invoiceform.get("customerId")?.value;
    let invoiceType = this.invoiceform.get("type")?.value;
    if ((customercode != null && customercode != '')  || this.isedit)
    {
      if((invoiceType != null && invoiceType != '')  || this.isedit)
      {
        this.invoicedetail.push(this.Generaterow());
      }
      else
        this.alert.warning('Please select the invoice type', 'Validation');
    }
    else
    {
      this.alert.warning('Please select the customer', 'Validation');
    }
  }

  get invproducts() {
    return this.invoiceform.get("details") as FormArray;
  }
  Generaterow() {
    return this.builder.group({
      invoiceNo: this.builder.control(''),
      productCode: this.builder.control('', Validators.required),
      productName: this.builder.control(''),
      productType: this.builder.control(''),
      qty: this.builder.control(1),
      salesPrice: this.builder.control(0),
      total: this.builder.control({ value: 0, disabled: true })
    });
  }


  GetCustomers() {
    this.service.GetCustomer().subscribe(res => {
      this.mastercustomer = res;
    })
  }
  GetDAssistants() {
    this.service.GetDAssistant().subscribe(res => {
      this.masterdassistant = res;
      //console.log("prepere");
      //console.log(res);
    })
  }

  GetProducts() {
    this.service.GetProducts().subscribe(res => {
      this.masterproduct = res;
    })
  }

  customerchange() {
    let customercode = this.invoiceform.get("customerId")?.value;
    this.service.GetCustomerbycode(customercode).subscribe(res => {
      let custdata: any;
      custdata = res;
      if (custdata != null) {
        // this.invoiceform.get("deliveryAddress")?.setValue(custdata.address + ',' + custdata.phoneno + ',' + custdata.email);
        this.invoiceform.get("deliveryAddress")?.setValue(custdata.address );
        this.invoiceform.get("customerName")?.setValue(custdata.name);
      }
    });
  }
  dassistantchange() {
    let dassistantcode = this.invoiceform.get("dassistantId")?.value;
    this.service.GetDAssistantbycode(dassistantcode).subscribe(res => {
      let dassistant: any;
      dassistant = res;
      console.log("heuy");
      console.log(res);
      if (dassistant != null) {
        this.invoiceform.get("dassistantName")?.setValue(dassistant.name);
      }
    });
  }

  productchange(index: any) {
    debugger;
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let productcode = this.invoiceproduct.get("productCode")?.value;
    this.service.GetProductbycode(productcode).subscribe(res => {
      let proddata: any;
      proddata = res;
      console.log(proddata);
      if (proddata != null) {
        this.invoiceproduct.get("productName")?.setValue(proddata.name);
        this.invoiceproduct.get("salesPrice")?.setValue(proddata.price);
        this.Itemcalculation(index);
      }
    });
  }

  Itemcalculation(index: any) {
    debugger;
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let qty = this.invoiceproduct.get("qty")?.value;
   // let type = this.invoiceproduct.get("productType")?.value;
    let price = this.invoiceproduct.get("salesPrice")?.value;
    let total = qty * price;
    this.invoiceproduct.get("total")?.setValue(total);

    this.summarycalculation();
  }
  Removeproduct(index: any){
    if(confirm('Do you want to remove?')){
      this.invproducts.removeAt(index);
      this.summarycalculation();

    }
  }

  summarycalculation() {
    let array = this.invoiceform.getRawValue().details;
    let sumtotal = 0
    array.forEach((x: any) => {
      sumtotal = sumtotal + x.total;
    });

    // tax calculation
    let sumtax = (7 / 100) * sumtotal;
    //let nettotal = sumtotal + sumtax;
    let nettotal = sumtotal;
    this.invoiceform.get("total")?.setValue(sumtotal);
    this.invoiceform.get("tax")?.setValue(sumtax);
  //  this.invoiceform.get("netTotal")?.setValue(nettotal);
  }



}
