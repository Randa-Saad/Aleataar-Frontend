import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../service/master.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor(private service: MasterService, private alert: ToastrService, private router: Router, private modalservice: NgbModal) { }

  @ViewChild('content') popupview !: ElementRef;

  Invoiceheader: any;
  pdfurl = '';
  invoiceno: any;
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  checkedInvoices:string[] = [];

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
    //  paging:false
    lengthChange:false,
    language:{
      searchPlaceholder:'Type here...'
    }

    };
    this.LoadInvoice();
  }
  
  //#region Load,edit,remove invoice
  LoadInvoice() {
    this.service.GetAllInvoice().subscribe(res => {
      this.Invoiceheader = res;
      console.log(res);
      this.dtTrigger.next(null);
    });
  }

  Editinvoice(invoiceno: any) {
    this.router.navigateByUrl('/editinvoice/' + invoiceno);
  }

  invoiceremove(invoiceno: any) {
    if (confirm('Do you want to remove this Invoice :' + invoiceno)) {
      this.service.RemoveInvoice(invoiceno).subscribe(res => {
        let result: any;
        result = res;
        if (result.result == 'pass') {
          this.alert.success('Removed Successfully.', 'Remove Invoice')
          this.LoadInvoice();
        } else {
          this.alert.error('Failed to Remove.', 'Invoice');
        }
      });
    }
    window.location.reload();
  }
//#endregion

//#region Restrict invoices
  addInvoiceCheckStatus(invoiceNo:number)
  {
    if (this.checkedInvoices?.includes(invoiceNo.toString()))
      this.checkedInvoices?.splice(this.checkedInvoices?.indexOf(invoiceNo.toString()), 1); 
    else
      this.checkedInvoices?.push(invoiceNo.toString());
  }
  restrictInvoices()
  {
      this.service.SaveHeader(this.checkedInvoices);
  }
  //#endregion

  //#region Commented ==> Try:Check all boxes when Check first one
      // checkAllCheckBox(ev: any) {
      
      //   this.Invoiceheader.forEach((x: { checked: any; }) =>{
      //     x.checked = ev.target.checked
      //     console.log(x.checked);
      //   })
      // }
      /*------------------------------------------
      --------------------------------------------
      call isAllCheckBoxChecked() function
      --------------------------------------------
      --------------------------------------------*/
      // isAllCheckBoxChecked() {
      //   debugger;
      //   return this.Invoiceheader.every((p: { checked: any; }) => p.checked);
      // }
  //#endregion

  //#region Print,download,preview invoice
    PrintInvoice(invoiceno: any) {
      this.service.GenerateInvoicePDF(invoiceno).subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      });
    }
    DownloadInvoice(invoiceno: any) {
      this.service.GenerateInvoicePDF(invoiceno).subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);

        let a = document.createElement('a');
        a.download = invoiceno;
        a.href = url;
        a.click();

      });
    }

    PreviewInvoice(invoiceno: any) {
      this.invoiceno = invoiceno;
      this.service.GenerateInvoicePDF(invoiceno).subscribe(res => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        this.pdfurl = url;
        this.modalservice.open(this.popupview, { size: 'lg' });
        //window.open(url);
      });
    }
  //#endregion


}
