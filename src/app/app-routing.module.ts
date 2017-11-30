import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponentComponent } from './list-component/list-component.component';
import { LoginComponent } from './login/login.component';
import { LoadListComponent } from './load-list/load-list.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { NewLoadComponent } from './new-load/new-load.component';
import { EditTruckListComponent } from './edit-truck-list/edit-truck-list.component';
import {GuardServices} from './guardServices';
import {EditLoadListComponent} from './edit-load-list/edit-load-list.component';
import {SignatureComponent} from './load-list/signature/signature.component';

const  routes: Routes = [
  {path: 'Lists', component: ListComponentComponent,  canActivate: [GuardServices]},
  {path: 'loadLists', component: LoadListComponent,  canActivate: [GuardServices]},
  {path: 'loadLists/:id', component: LoadListComponent,  canActivate: [GuardServices]},
  {path: 'truckLists', component: TruckListComponent,  canActivate: [GuardServices]},
  {path: 'newLoad', component: NewLoadComponent,  canActivate: [GuardServices]},
  {path: 'editTruckList', component: EditTruckListComponent,  canActivate: [GuardServices]},
  {path: 'editLoad', component: EditLoadListComponent,  canActivate: [GuardServices]},
  {path: 'signature', component: SignatureComponent,  canActivate: [GuardServices]},
  {path: '**', component: LoginComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers : [
    GuardServices
  ]
})
export class AppRoutingModule { }
export const routingComponent = [ListComponentComponent, LoginComponent, TruckListComponent];
