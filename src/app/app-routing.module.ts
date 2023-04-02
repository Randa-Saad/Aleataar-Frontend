import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';
import { AddnewcustomerComponent } from './customers/addnew/addnewcustomer.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { ListingComponent } from './listing/listing.component';
import { ProductComponent } from './products/product/product.component';
import { RatingComponent } from './rating/rating.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './sign/login/login.component';

const routes: Routes = [
  {path:"",component:ListingComponent,canActivate:[AuthGuard] },
  {path:"createinvoice",component:CreateinvoiceComponent},
  {path:"editinvoice/:invoiceno",component:CreateinvoiceComponent},
  {path:"rating",component:RatingComponent},
  {path:"product",component:ProductComponent},
  {path: 'login', component: LoginComponent },
  {path: "customer", component: CustomerComponent},
  { path: "customer/create", component: AddnewcustomerComponent },
  { path: "Edit/:id", component: AddnewcustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
