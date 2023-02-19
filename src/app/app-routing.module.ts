import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';
import { AddnewComponent } from './customers/addnew/addnew.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { ListingComponent } from './listing/listing.component';
import { RatingComponent } from './rating/rating.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './sign/login/login.component';

const routes: Routes = [
  {path:"",component:ListingComponent,canActivate:[AuthGuard] },
  {path:"createinvoice",component:CreateinvoiceComponent},
  {path:"editinvoice/:invoiceno",component:CreateinvoiceComponent},
  {path:"rating",component:RatingComponent},
  {path: 'login', component: LoginComponent },
  {path: "customer", component: CustomerComponent},
  { path: "customer/create", component: AddnewComponent },
  { path: "Edit/:id", component: AddnewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
